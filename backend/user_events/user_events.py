from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId

mongo_uri = 'mongodb://root:c0mpl1cat3d@mongodb.dbs:27017'  # Update with your MongoDB URI
client = MongoClient(mongo_uri)
db = client['genai']  # Update with your database name
collection = db['user_events']  # Update with your collection name

class UserEvent:
    def __init__(self,user_id, cognitive_id=None,  intent_id=None):
        self.cognitive_id = cognitive_id
        self.intent_id = intent_id
        self.user_id = user_id
        self.created = datetime.now()
        self.updated = datetime.now()
    def save(self):
        result = collection.insert_one(self.__dict__)
        return str(result.inserted_id)

    @staticmethod
    def get_all():
        events = []
        for event in collection.find():
            events.append(UserEvent(event['name'], event['userId'], event['body']))
        return events

    @staticmethod
    def get_by_id(event_id):
        event = collection.find_one({'_id': ObjectId(event_id)})
        if event:
            return UserEvent(event['name'], event['userId'], event['body'])
        else:
            return None

    @staticmethod
    def get_by_user_id(user_id):
        items = collection.find({'user_id': user_id})
        events = []
        for event in items:
            events.append(event)
        return events

    def update(self):
        updated_event = {
            'name': self.name,
            'userId': self.userId,
            'body': self.body
        }
        result = collection.update_one({'_id': ObjectId(self.id)}, {'$set': updated_event})
        return result.modified_count > 0

    def delete(self):
        result = collection.delete_one({'_id': ObjectId(self.id)})
        return result.deleted_count > 0
