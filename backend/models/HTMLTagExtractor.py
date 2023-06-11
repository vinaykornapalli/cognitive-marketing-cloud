import pandas as pd
from bs4 import BeautifulSoup

class HTMLTagExtractor:
    def __init__(self, html_path, cognitive_output_path, intent_output_path):
        self.html_path = html_path
        self.cognitive_output_path = cognitive_output_path
        self.intent_output_path = intent_output_path
        self.html = self.read_html_file()

    def read_html_file(self):
        with open(self.html_path, 'r') as file:
            html = file.read()
        return html

    def extract_all_tags(self):
        soup = BeautifulSoup(self.html, 'html.parser')
        all_tags = soup.find_all()
        return all_tags

    def extract_fields(self, tag):
        attributes = tag.attrs
        cognitive_id = attributes.get('cognitive_id')
        cognitive_desc = attributes.get('cognitive_desc')
        intent_id = attributes.get('intent_id')
        intent_desc = attributes.get('intent_desc')
        return cognitive_id, cognitive_desc, intent_id, intent_desc

    def create_dataframes(self, tags):
        cognitive_data = []
        intent_data = []
        for tag in tags:
            cognitive_id, cognitive_desc, intent_id, intent_desc = self.extract_fields(tag)
            if cognitive_id is not None and cognitive_desc is not None:
                cognitive_data.append([cognitive_id, cognitive_desc])
            if intent_id is not None and intent_desc is not None:
                intent_data.append([intent_id, intent_desc])
        cognitive_df = pd.DataFrame(cognitive_data, columns=['cognitive_id', 'cognitive_desc'])
        intent_df = pd.DataFrame(intent_data, columns=['intent_id', 'intent_desc'])
        return cognitive_df, intent_df

    def extract_tags_to_dataframes(self):
        all_tags = self.extract_all_tags()
        cognitive_df, intent_df = self.create_dataframes(all_tags)
        return cognitive_df, intent_df

    def generate_receptors_csv(self):
        cognitive_df, intent_df = self.extract_tags_to_dataframes()
        cognitive_df.to_csv(self.cognitive_output_path+'/cognitive.csv', index=False)
        intent_df.to_csv(self.intent_output_path+'/intent.csv', index=False)
        print(f"Cognitive DataFrame saved as CSV at {self.cognitive_output_path}")
        print(f"Intent DataFrame saved as CSV at {self.intent_output_path}")
