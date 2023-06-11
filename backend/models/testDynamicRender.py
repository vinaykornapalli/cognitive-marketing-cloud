#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from models.HTMLTagExtractor import HTMLTagExtractor
from models.CognitiveReceptorsInitializer import CognitiveReceptorsInitializer
from models.CognitiveProfileGenerator import CognitiveProfileGenerator
from models.ChatGPTResponseGenerator import ChatGPTResponseGenerator 
from models.IntentProfileGenerator import IntentProfileGenerator
from models.DynamicContentRetriever import DynamicContentRetriever
import pandas as pd
import os
import glob

# TODO: handle multi tenancy
mapped_df = pd.read_csv('models/cognitive_mapping.csv')
intent_df = pd.read_csv('models/intent_mapping.csv')
api_key = "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"

def testDynamicContentRender(intent_event_ids, cognitive_event_ids):
  print(intent_event_ids)
  print(cognitive_event_ids)
  
  generator = CognitiveProfileGenerator(cognitive_event_ids, mapped_df)
  cognitive_profile= generator.generate_weights()
  cognitive_profile = generator.normalize_weights()
  print("congitive profile:", cognitive_profile)
  generator = IntentProfileGenerator(intent_event_ids,intent_df)
  intent_profile = generator.generate_weights()
  intent_profile = generator.normalize_weights()
  dir = os.getcwd() + '/models/'
  print(dir)
  dynamic_content_retriever = DynamicContentRetriever(cognitive_profile, intent_profile, dir + 'feature_file.csv',
                                          dir+ '',api_key)
  return dynamic_content_retriever.generate_all_dynamic_components()


def SendEmail(intent_event_ids, cognitive_event_ids, email):  
  generator = CognitiveProfileGenerator(cognitive_event_ids, mapped_df)
  cognitive_profile= generator.generate_weights()
  cognitive_profile = generator.normalize_weights()
  print("congitive profile:", cognitive_profile)
  generator = IntentProfileGenerator(intent_event_ids,intent_df)
  intent_profile = generator.generate_weights()
  intent_profile = generator.normalize_weights()
  dir = os.getcwd() + '/models/'
  print(dir)
  dynamic_content_retriever = DynamicContentRetriever(cognitive_profile, intent_profile, dir + 'feature_file.csv',
                                          dir+ '',api_key)
  print(email)
  dynamic_content_retriever.send_user_mail('User', email)

def fetchSalesPitch(intent_event_ids, cognitive_event_ids):
  generator = CognitiveProfileGenerator(cognitive_event_ids, mapped_df)
  cognitive_profile= generator.generate_weights()
  cognitive_profile = generator.normalize_weights()
  print("congitive profile:", cognitive_profile)
  generator = IntentProfileGenerator(intent_event_ids,intent_df)
  intent_profile = generator.generate_weights()
  intent_profile = generator.normalize_weights()
  dir = os.getcwd() + '/models/'
  print(dir)
  dynamic_content_retriever = DynamicContentRetriever(cognitive_profile, intent_profile, dir + 'feature_file.csv',
                                          dir+ '',api_key)
  return dynamic_content_retriever.generate_sales_pitch_tips()



