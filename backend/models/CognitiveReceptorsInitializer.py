import pandas as pd
import openai
from tqdm import tqdm
import re


class CognitiveReceptorsInitializer:
    def __init__(self, api_key, df, map_file_path, count_file_path):
        self.api_key = api_key
        self.df = df
        self.model = "gpt-3.5-turbo"
        self.map_file_path = map_file_path
        self.count_file_path = count_file_path

    def generate_response(self, prompt):
        openai.api_key = self.api_key

        response = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            top_p=1.0,
            n=1,
            stop=None
        )

        return response.choices[0].message['content'].strip()

    def map_tag_texts(self):
        tag_mapping = {}
        tag_mapping_root = {}
        for index, row in tqdm(self.df.iterrows(), total=len(self.df)):
            cognitive_desc = row['cognitive_desc']
            print(cognitive_desc)
            prompt = "map the description: \""+ cognitive_desc + \
            """\" to one of the eight cognitive functions mentioned below. strictly return the closest of the below. dont return none or no other values.
Cognitive Functions:

Extraverted Thinking (Te)
Introverted Thinking (Ti)
Extraverted Feeling (Fe)
Introverted Feeling (Fi)
Extraverted Sensing (Se)
Introverted Sensing (Si)
Extraverted Intuition (Ne)
Introverted Intuition (Ni)"""
            print(prompt)
            
            response = self.generate_response(prompt)
            print(response)
            tag_mapping_root[index] = response
            cognitive_profiles = ['(Te)','(Ti)','(Fe)','(Fi)','(Se)','(Si)','(Ne)','(Ni)']
            for prof in cognitive_profiles:
                if prof in response:
                    tag_mapping[index] = re.search(r'\((\w+)\)', prof).group(1)
                    break
            self.df['cognitive_functionality_root'] = self.df.index.map(tag_mapping_root)
            self.df['cognitive_functionality'] = self.df.index.map(tag_mapping)
        
    def get_cognitive_mapping_df(self):
        self.map_tag_texts()
        mapping_df = pd.DataFrame({
            'cognitive_id': self.df['cognitive_id'],
            'cognitive_functionality': self.df['cognitive_functionality'],
            'cognitive_functionality_root': self.df['cognitive_functionality_root']
        })
        return mapping_df.dropna()

    def generate_map_csv(self):
        mapping_df = self.get_cognitive_mapping_df()
        mapping_df.to_csv(self.map_file_path+'/cognitive_receptor_map.csv', index=False)
        print(f"CSV file saved at: {self.map_file_path}")

    def generate_category_counts(self):
        count_dict = {
            'Te': 0,
            'Ti': 0,
            'Fe': 0,
            'Fi': 0,
            'Se': 0,
            'Si': 0,
            'Ne': 0,
            'Ni': 0
        }

        for _, row in self.df.iterrows():
            functionality = row['cognitive_functionality']
            count_dict[functionality] += 1
    
        count_df = pd.DataFrame(count_dict.items(), columns=['function', 'count'])
        return count_df

    def generate_count_csv(self):
        count_df = self.generate_category_counts()
        count_df.to_csv(self.count_file_path+'/cognitive_receptor_count.csv', index=False)
        print(f"CSV file saved at: {self.count_file_path}")
