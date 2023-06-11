
import io from 'socket.io-client';

const socket = io('http://localhost:5000', { transports: ['websocket'] });
const generateUserId = () => {
    // Generate a random string using timestamp and Math.random()
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2);
  
    return `${timestamp}-${randomString}`;
  };
export const pushData = (e) => {
    // Check if userId exists in local storage
let userId = localStorage.getItem('userId');

if (!userId) {
// Generate a new userId
userId = generateUserId();
// Store the userId in local storage
localStorage.setItem('userId', userId);
}
console.log(e);
const cognitive_id = e.target.attributes["cognitive_id"]?.nodeValue;
const intent_id = e.target.attributes["intent_id"]?.nodeValue;
const payload = {
userId, cognitive_id, intent_id
}
socket.emit('clickEvent', payload);
};

export const pushDataSimple = (payload) => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        // Generate a new userId
        userId = generateUserId();
        // Store the userId in local storage
        localStorage.setItem('userId', userId);
        }
        payload.user_id = userId
        socket.emit('clickEvent', payload);
}