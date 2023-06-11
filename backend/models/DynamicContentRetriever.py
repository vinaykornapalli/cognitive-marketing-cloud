from models.HTMLTagExtractor import HTMLTagExtractor
from models.CognitiveReceptorsInitializer import CognitiveReceptorsInitializer
from models.CognitiveProfileGenerator import CognitiveProfileGenerator
from models.IntentProfileGenerator import IntentProfileGenerator
from models.ChatGPTResponseGenerator import ChatGPTResponseGenerator
import pandas as pd
import os

import glob
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

class DynamicContentRetriever:
    def __init__(self, cognitive_profile, intent_profile, feature_file, images_path, gpt_api_key):
        os.environ["OPENAI_API_KEY"] = gpt_api_key
        self.cognitive_profile = cognitive_profile
        self.intent_profile = intent_profile
        self.feature_file = feature_file
        self.images_path = images_path
        self.dynamic_page_contents = {}
        self.generator = ChatGPTResponseGenerator(gpt_api_key)
        self.storage_context = StorageContext.from_defaults(persist_dir="index")
    
    def getDataFromBrochure(self,intent):
        index = load_index_from_storage(self.storage_context)
        query_engine = index.as_query_engine()
        response = query_engine.query(
            "give as much info as possible from the document that represent " + intent)
        return response.response
        
    def retrieve_id1_content(self):
        num_images = int(self.cognitive_profile['Se'] * 5)
        if num_images == 0:
            num_images = 1
        
        all_images = ['https://assets.volkswagen.com/is/image/volkswagenag/virtus-safety-gncap?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
                     'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-usp-1?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
                     'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-usp-3?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE2MDAmaGVpPTEyMDAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmMjRhZQ==',
                     'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-service?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTEyODAmaGVpPTcyMCZhbGlnbj0wLjAwLDAuMDAmYmZjPW9mZiY5ZjIy',
                     'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-gallery-3?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTEyODAmaGVpPTcyMCZhbGlnbj0wLjAwLDAuMDAmYmZjPW9mZiY5ZjIy']
        self.dynamic_page_contents['id1'] = random.sample(all_images, num_images)

    def retrieve_id2_content(self):
        tag_line = self.generator.generate_response('generate a small catchy tag line for the car - Virtus Volkswagen to attract a customer whose MBTI personalities are: ' + str(self.cognitive_profile) + ' and his interests are ' + str(self.intent_profile) + ' values representing weights. Mend it to align with user personality. Give importance to high weighted features. Do not mention any details about intent or cognitive profile. Make it strictly professional. Return only tagline strictly no other sentences')
        self.dynamic_page_contents['id2'] = tag_line

    def retrieve_id3_content(self):
        llama_output = {}
        for intent in ['safety', 'design', 'performance', 'technology']:
            llama_output[intent]= self.getDataFromBrochure(intent)
            llama_output[intent]
    
        virtus_description = str(llama_output)
        detailed_description = self.generator.generate_response('Generate a detailed marketing description to be shown in the ad. Modify the Virtus car description: ' + virtus_description + ' to suit the user\'s interests with weights: ' + str(self.intent_profile) + '. Give importance to high weighted features. I want to show the description readily in advertisement')

        desc_type = 'string'
        if self.cognitive_profile['Te'] > self.cognitive_profile['Ti']:
            description = self.generator.generate_response('Convert to short brief bullet points without missing any sentence:' + detailed_description + ' I want to show the description readily in advertisement')
            return_description = description.split('\n')
            desc_type = 'list'
        else:
            description = detailed_description
            return_description = detailed_description
            
        
        description_title = self.generator.generate_response('generate a shorter catchy title to this virtus volkswagen model:\"'+  description +'\" \n I want to show the description readily in advertisement')
        self.dynamic_page_contents['id3'] = {'title': description_title, 'description':return_description, 'type': desc_type}

    def retrieve_id4_content(self):
        image_profile = {k: round(v * 4, 0) for k, v in self.intent_profile.items()}
        feature_df = pd.read_csv(self.feature_file)

        selected_indices = []
        for category, weight in image_profile.items():
            category_features = feature_df[feature_df['category'] == category]
            num_selections = int(weight)
            if num_selections > len(category_features):
                num_selections = len(category_features)
            selected = random.sample(category_features.index.tolist(), num_selections)
            selected_indices.extend(selected)

        self.dynamic_page_contents['id4'] = list(feature_df.loc[selected_indices, :].to_dict(orient='index').values())
    
    def retrieve_id5_content(self):
        #id5
        llama_output = {}
        for intent in ['versatility', 'innovation', 'stability', 'quality']:
            llama_output[intent]= self.getDataFromBrochure(intent)
            llama_output[intent]
            
        generic_description = str(llama_output)
        if self.cognitive_profile['Ne'] > self.cognitive_profile['Ni'] :
            intuition_description = self.generator.generate_response('rewrite this paragraph to emphasize more on versatility and innovation: '+ generic_description +'I want to show the description readily in advertisement')
        elif self.cognitive_profile['Ne'] < self.cognitive_profile['Ni']:
            intuition_description = self.generator.generate_response('rewrite this paragraph to emphasize more on safety, stability and quality: '+ generic_description +'I want to show the description readily in advertisement')
        else:
            intuition_description = generic_description

        intuition_title = self.generator.generate_response('generate a shorter catchy title to this virtus volkswagen model:'+ intuition_description  +'I want to show the description readily in advertisement')
        self.dynamic_page_contents['id5'] = {'title': intuition_title, 'description': intuition_description}
        
    def generate_all_dynamic_components(self):
        self.retrieve_id1_content()
        self.retrieve_id2_content()
        self.retrieve_id3_content()
        self.retrieve_id4_content()
        self.retrieve_id5_content()
        return self.dynamic_page_contents
    
    def generate_sales_pitch_tips(self):
        sales_pitch_desc = self.generator.generate_response('give tips to sales person, who is pitching Volkswagen Virtus to a user with cognitive profile: \"'+  str(self.cognitive_profile) +'\" and relative interest profile: \"' + str(self.intent_profile) + '\". I should give this to sales person directly.dont disclose user cogntiive or intent profiles. Donot give any details on why certain tip is given. Only tips. No info on cognitive characteristics or intent. Just TIPS')
        return sales_pitch_desc


    def send_user_mail(self, user_name, user_email):
        llama_output = {}
        for intent in ['safety', 'design', 'performance', 'technology']:
            llama_output[intent]= self.getDataFromBrochure(intent)
            llama_output[intent]
    
        virtus_description = str(llama_output)

        user_mail = self.generator.generate_response(
            'Customize this content: \"' + virtus_description + '\" to generate a short paragraph for user promoting the Volkswagen Virtus. Customize content based on his cognitive profile: \"' + str(
                self.cognitive_profile) + '\" and relative interest profile: \"' + str(self.intent_profile) + '\". Do not disclose user cognitive or intent profiles. Do not give any details on why a certain mail is given. Only paragraph. No info on cognitive characteristics or intent. Just a paragraph')
        email_text = 'Dear ' + user_name + ', \n\nThanks for your interest in the new Volkswagen Virtus!\n\n' + user_mail + '\n\nVolkswagen India.\n'

        subject = "Hello from Volkswagen!"
        msg = MIMEMultipart()
        msg['From'] = "cognitivemarketingcloud@gmail.com"
        msg['To'] = user_email
        msg['Subject'] = subject
        msg.attach(MIMEText(email_text, 'plain'))
        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()
        s.login("cognitivemarketingcloud@gmail.com", "vgkqgbgpalgamruo")
        s.sendmail("cognitivemarketingcloud@gmail.com", user_email, msg.as_string())
        s.quit()
        
        
