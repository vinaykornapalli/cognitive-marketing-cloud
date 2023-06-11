import logging
from models.HTMLTagExtractor import HTMLTagExtractor
from models.CognitiveReceptorsInitializer import CognitiveReceptorsInitializer
from models.CognitiveProfileGenerator import CognitiveProfileGenerator
from models.IntentProfileGenerator import IntentProfileGenerator
import pandas as pd
import os

def main(html_path, gpt_api_key, cognitive_path, intent_path, map_path, count_path):
    # Configure logging
    logging.basicConfig(filename='log.txt', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    # Extract HTML tags
    logging.info('Extracting HTML tags...')
    tag_extractor = HTMLTagExtractor(html_path, cognitive_path, intent_path)
    tag_extractor.generate_receptors_csv()

    # Load cognitive DataFrame
    logging.info('Loading cognitive DataFrame...')
    cognitive_df = pd.read_csv(os.path.join(cognitive_path, 'cognitive.csv'))

    api_key = gpt_api_key

    # Initialize cognitive receptors
    logging.info('Initializing cognitive receptors...')
    receptor_initializer = CognitiveReceptorsInitializer(api_key, cognitive_df, map_path, count_path)
    receptor_initializer.generate_map_csv()
    receptor_initializer.generate_count_csv()

    logging.info('Initialization complete')

if __name__ == '__main__':
    html_path = '../pages/landing_page.html'
    gpt_api_key = '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'
    cognitive_path = '../output'
    intent_path = '../output'
    map_path = '../output'
    count_path = '../output'
    main(html_path, gpt_api_key, cognitive_path, intent_path, map_path, count_path)
