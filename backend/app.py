from flask import Flask, request, jsonify
from models.testDynamicRender import testDynamicContentRender, SendEmail, fetchSalesPitch
from user_events.user_events import UserEvent
from flask_socketio import SocketIO
import eventlet
from eventlet import wsgi
from collections import defaultdict

app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins="*", engineio_logger=True)
@app.route('/', methods=['GET'])
def hello():
    return 'Hello, World!'

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@socketio.on('connect')
def chat_connect():
    print ('connected')

@socketio.on('disconnect')
def chat_disconnect():
    print ("Client disconnected")

@socketio.on('clickEvent')
def handle_message(message):
    try:
        if ("intent_id" not in message.keys() or message['intent_id'] == None) and ("cognitive_id" in message.keys() and message['cognitive_id'] != None):
            event = UserEvent(cognitive_id=message['cognitive_id'], user_id=message['user_id'])
        elif ("intent_id" in message.keys() and message['intent_id'] != None) and ("cognitive_id" not in message.keys() or message['cognitive_id'] == None):
            event = UserEvent(user_id=message['user_id'], intent_id = message['intent_id'])
        else:
            event = UserEvent(cognitive_id=message['cognitive_id'], user_id=message['user_id'], intent_id = message['intent_id'])
        event_id = event.save()
        print('Received message:', message, event_id)
    except Exception as e:
        print('error', e)
@app.route('/health-check', methods=['GET'])
def health_check():
    return jsonify({'status': 'workingg'})

@app.route('/events', methods=['GET'])
def get_all_events():
    events = UserEvent.get_all()
    event_list = []
    for event in events:
        event_list.append({
            'id': event.id,
            'name': event.name,
            'userId': event.userId,
            'body': event.body
        })
    return jsonify(event_list)

@app.route('/events/<event_id>', methods=['GET'])
def get_event(event_id):
    event = UserEvent.get_by_id(event_id)
    if event:
        return jsonify({
            'id': event.id,
            'name': event.name,
            'userId': event.userId,
            'body': event.body
        })
    else:
        return jsonify({'message': 'Event not found'}), 404

@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    event = UserEvent(name=data['name'], userId=data['userId'], body=data['body'])
    event_id = event.save()
    return jsonify({'message': 'Event created', 'id': event_id}), 201

@app.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    data = request.get_json()
    event = UserEvent.get_by_id(event_id)
    if event:
        event.name = data['name']
        event.userId = data['userId']
        event.body = data['body']
        if event.update():
            return jsonify({'message': 'Event updated'})
        else:
            return jsonify({'message': 'Failed to update event'}), 500
    else:
        return jsonify({'message': 'Event not found'}), 404

@app.route('/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = UserEvent.get_by_id(event_id)
    if event:
        if event.delete():
            return jsonify({'message': 'Event deleted'})
        else:
            return jsonify({'message': 'Failed to delete event'}), 500
    else:
        return jsonify({'message': 'Event not found'}), 404

content = None
contentMap = defaultdict(int)
@app.route('/generatePage/<user_id>', methods=['GET'])
def generatePage(user_id):
    events = UserEvent.get_by_user_id(user_id)
    print(user_id)
    event_list = []
    cognitive_event_ids = []
    intent_event_ids = []
    for event in events:
        print(event)
        if ("intent_id" in event.keys() and event['intent_id'] != None):
            intent_event_ids.append(int(event['intent_id']))
        if ("cognitive_id" in event.keys() and event['cognitive_id'] != None):
            cognitive_event_ids.append(int(event['cognitive_id']))

    print(cognitive_event_ids, intent_event_ids)
    global contentMap 
    if contentMap[user_id] == 0: 
        contentMap[user_id] = testDynamicContentRender(intent_event_ids, cognitive_event_ids)
    return jsonify(contentMap[user_id])


@app.route('/sendEmail/<user_id>', methods=['GET'])
def sendEmail(user_id):
    try:
        events = UserEvent.get_by_user_id(user_id)
        print(user_id)
        args = request.args
        print(args)
        email = args.get("email")
        cognitive_event_ids = []
        intent_event_ids = []
        for event in events:
            print(event)
            if ("intent_id" in event.keys() and event['intent_id'] != None):
                intent_event_ids.append(int(event['intent_id']))
            if ("cognitive_id" in event.keys() and event['cognitive_id'] != None):
                cognitive_event_ids.append(int(event['cognitive_id']))

        print(cognitive_event_ids, intent_event_ids)
        SendEmail(intent_event_ids, cognitive_event_ids, email)
        return jsonify({'status': 'successfully triggered'})
    except Exception as e: 
        print(e)
        return jsonify({'error': "true"})

@app.route('/fetchSalesPitch/<user_id>', methods=['GET'])
def salesPitch(user_id):
    try:
        events = UserEvent.get_by_user_id(user_id)
        print(user_id)
        cognitive_event_ids = []
        intent_event_ids = []
        for event in events:
            print(event)
            if ("intent_id" in event.keys() and event['intent_id'] != None):
                intent_event_ids.append(int(event['intent_id']))
            if ("cognitive_id" in event.keys() and event['cognitive_id'] != None):
                cognitive_event_ids.append(int(event['cognitive_id']))

        print(cognitive_event_ids, intent_event_ids)
        response = fetchSalesPitch(intent_event_ids, cognitive_event_ids)
        return jsonify({'pitch': response})
    except Exception as e: 
        print(e)
        return jsonify({'error': "true"})
 
if __name__ == '__main__':
    wsgi.server(eventlet.listen(("0.0.0.0", 5000)), app)