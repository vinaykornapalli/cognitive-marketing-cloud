import React from 'react';
import { Card, Col, Row } from 'antd';
import { Container } from 'react-bootstrap';

const VolkswagenCards = () => {
    const handleCardClick = (url) => {
        window.location.href = url;
    };

    return (
        <Container>
            <h2 className='text-center'>Social Media Handles</h2>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Card
                        cover={<img cognitive_id={'7'} alt="Card 1" onClick={() => handleCardClick('https://www.volkswagen.com')} style={{ objectFit: 'cover', height: '300px' }} src="data:image/jpeg;base64,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" />}

                    >
                        <div className="card-overlay">Instagram</div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        cover={<img cognitive_id={'7'} onClick={() => handleCardClick('https://www.volkswagen.com')} alt="Card 2" style={{ objectFit: 'cover', height: '300px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJvRzYbpdM6vr_J9FAM8eEeCEfQSSQnPE1cw&usqp=CAU" />}

                    >
                        <div className="card-overlay">Facebook</div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        cover={<img alt="Card 3" cognitive_id={'7'} onClick={() => handleCardClick('https://www.volkswagen.com')} style={{ objectFit: 'cover', height: '300px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNexoP1yhcILEl7koMoTWHgJ_sGWxMxj9CRQ&usqp=CAU" />}
                        onClick={() => handleCardClick('https://www.volkswagen.com')}
                    >
                        <div className="card-overlay">Twitter</div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        cover={<img alt="Card 4" cognitive_id={'7'} onClick={() => handleCardClick('https://www.volkswagen.com')} style={{ objectFit: 'cover', height: '300px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCU-sI7q8gU_IuU7pPXC5LdMyzYwsFDpzwug&usqp=CAU" />}

                    >
                        <div className="card-overlay">LinkedIn</div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default VolkswagenCards;