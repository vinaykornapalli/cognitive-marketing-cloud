import React, { useState } from 'react';
import { Button, Col, Row, Input } from 'antd';
import { Toast } from 'react-bootstrap';
const Demo = () => {

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [email, setEmail] = useState('');
  const handleShowToast = (message) => {
    setShowToast(true);
    setToastMessage(message)
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };
  const generatePage = () => {
    // Make API call 1
    fetch('https://api.example.com/endpoint1')
      .then(response => response.json())
      .then(data => {
        // Handle API response for call 1
        console.log('API response 1:', data);
      })
      .catch(error => {
        // Handle API error for call 1
        console.error('API error 1:', error);
      });
  };

  const sendEmail = () => {
    // Make API call 2
    let userId = localStorage.getItem('userId');
    
    fetch(`http://localhost:5000/sendEmail/${userId}?email=${email}`)
      .then(response => response.json())
      .then(data => {
        // Handle API response for call 2
        console.log('API response 2:', data);
        handleShowToast(`Email Delivered Successfully`);
      })
      .catch(error => {
        // Handle API error for call 2
        console.error('API error 2:', error);
      });
  };

  const prepareSalesPitch = () => {
    // Make API call 3
    let userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/fetchSalesPitch/${userId}}`)
      .then(response => response.json())
      .then(data => {
        // Handle API response for call 3
        console.log('API response 3:', data);
        handleShowToast(data['pitch']);
      })
      .catch(error => {
        // Handle API error for call 3
        console.error('API error 3:', error);
      });
  };

  const onChangeInput = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  return (
    <div className='container containerPadder'>
      <h2>Cognitive Marketing Demo</h2>
      <div className='containerPadder'>
      <Row>
        <Col md={8}>
          <p>Generate dynamic interations based on user persona.</p>
          <Button href="http://localhost:3000/virtus">Generate Page</Button>
        </Col>
        <Col md={8}>
          <p>Send personalised Content based on user cognitive profile</p>
          <Input  placeholder="please Enter the mail" onChange={onChangeInput} style={{marginBottom: '10px'}}></Input>
          <Button onClick={sendEmail} >Send Email</Button>

        </Col>
        <Col md={8}>
        <p>Get a gist about the user likings/non likings and enable your SDRs </p>
          <Button onClick={prepareSalesPitch}>Generate Sales Pitch</Button>
        </Col>
      </Row>
      </div>
      <div class='container text-center containerPadder d-flex justify-content-center align-items-center vh-100'>
      <Toast show={showToast} onClose={handleCloseToast} className='position-absolute top-50 start-50 translate-middle'>
        <Toast.Header className="me-auto">
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      </div>
    </div>
   
  );
};

export default Demo;
