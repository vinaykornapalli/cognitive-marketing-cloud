import pandas as pd

class IntentProfileGenerator:
    def __init__(self, interactions, intent_df):
        self.interactions = interactions
        self.mapped_dict = intent_df[['intent_id', 'intent_desc']].set_index('intent_id').to_dict()['intent_desc']
        self.count_dict = {
            'safety': 0,
            'design': 0,
            'performance': 0,
            'technology': 0
        }

    def generate_weights(self):
        for interaction in self.interactions:
            intent_desc = self.mapped_dict.get(interaction)
            if intent_desc:
                self.count_dict[intent_desc] += 1
        return self.count_dict

    def normalize_weights(self):
        intent_weights = self.generate_weights()
        total_weight = sum(intent_weights.values())
        normalized_weights = {}
        for intent, weight in intent_weights.items():
            try:
                normalized_weight = round(weight / total_weight,2)
            except ZeroDivisionError:
                normalized_weight = 0.0 
            normalized_weights[intent] = normalized_weight

        return normalized_weights
