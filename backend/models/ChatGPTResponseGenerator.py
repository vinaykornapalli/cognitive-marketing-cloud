import openai

class ChatGPTResponseGenerator:
    def __init__(self, api_key):
        self.api_key = api_key
        self.model = "gpt-3.5-turbo"
    def generate_response(self,prompt):
        openai.api_key = self.api_key

        response = openai.ChatCompletion.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            top_p=1.0,
            n=1,
            stop=None
        )

        return response.choices[0].message['content'].strip()
