import { useEffect } from 'react';
import io from 'socket.io-client';
import "tailwindcss/tailwind.css";

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const generateUserId = () => {
  // Generate a random string using timestamp and Math.random()
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2);

  return `${timestamp}-${randomString}`;
};

function App() {
  useEffect(() => {

    const handleClick = (e) => {
          // Check if userId exists in local storage
    let userId = localStorage.getItem('userId');
     console.log(e);
    if (!userId) {
      // Generate a new userId
      userId = generateUserId();
      // Store the userId in local storage
      localStorage.setItem('userId', userId);
    }
     const cognitive_id = e.target.attributes["cognitive_id"]?.nodeValue;
     const intent_id = e.target.attributes["intent_id"]?.nodeValue;
     const payload = {
      user_id: userId, cognitive_id, intent_id
    }
      socket.emit('clickEvent', payload);
    };

    window.addEventListener('click', handleClick);
    const elements = document.querySelectorAll('[cognitive_id]');
    elements.forEach((element) => {
      element.addEventListener('click', handleClick);
    });

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('change', handleClick);
      elements.forEach((element) => {
        element.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return;
}

export default App;
