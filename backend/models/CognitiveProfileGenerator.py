import pandas as pd

class CognitiveProfileGenerator:
    def __init__(self, interactions, mapped_df):
        self.interactions = interactions
        self.mapped_dict = mapped_df[['cognitive_id', 'cognitive_functionality']].set_index('cognitive_id').to_dict()['cognitive_functionality']
        self.count_dict = {
            'Te': 0,
            'Ti': 0,
            'Fe': 0,
            'Fi': 0,
            'Se': 0,
            'Si': 0,
            'Ne': 0,
            'Ni': 0
        }

    def generate_weights(self):
        for interaction in self.interactions:
            cognitive_functionality = self.mapped_dict.get(interaction)
            if cognitive_functionality:
                self.count_dict[cognitive_functionality] += 1

        return self.count_dict

    def normalize_weights(self):
        cognitive_weights = self.generate_weights()

        category_weights = {}
        for cognitive_function, weight in cognitive_weights.items():
            category = cognitive_function[0]
            if category not in category_weights:
                category_weights[category] = weight
            else:
                category_weights[category] += weight

        normalized_weights = {}
        for cognitive_function, weight in cognitive_weights.items():
            category = cognitive_function[0]
            try:
                normalized_weight = round(weight / category_weights[category],2)
            except ZeroDivisionError:
                normalized_weight = 0.0  # Handle division by zero
            normalized_weights[cognitive_function] = normalized_weight

        return normalized_weights
    
    def get_profile(self):
        normalized_weights = self.normalize_weights()
        category_max_subcategory = {}

        for cognitive_function, weight in normalized_weights.items():
            category = cognitive_function[0]
            subcategory = cognitive_function
            if category not in category_max_subcategory or weight > category_max_subcategory[category][1]:
                category_max_subcategory[category] = (subcategory, weight)

        profile = {}
        for category, (subcategory, weight) in category_max_subcategory.items():
            if weight == 0:
                profile[category] = 'NA'
            else:
                profile[category] = subcategory

        return profile

            
            
        
        
