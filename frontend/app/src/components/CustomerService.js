import React from 'react';
import { Card, Col, Row } from 'antd';
import { Container } from 'react-bootstrap';

const CustomerService = () => {
    const handleCardClick = (url) => {
        window.location.href = url;
    };

    return (
        <Container>
            <h2 className='text-center'>Customer Service</h2>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card
                        cover={<img cognitive_id={'5'} alt="Card 1" onClick={() => handleCardClick('https://www.volkswagen.com')} style={{ objectFit: 'cover', height: '300px' }} src="https://assets.volkswagen.com/is/image/volkswagenag/4ever-care?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTk2MCZoZWk9OTYwJmFsaWduPTAuMDAsMC4wMCZiZmM9b2ZmJmI0NjI=" />}

                    >
                        <div className="card-overlay">4Ever Care</div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={<img cognitive_id={'5'} onClick={() => handleCardClick('https://www.volkswagen.com')} alt="Card 2" style={{ objectFit: 'cover', height: '300px' }} src="https://assets.volkswagen.com/is/image/volkswagenag/Homepage-Service-Benefit?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTY4MCZoZWk9NTEwJmFsaWduPTAuMDAsMC4wMCZiZmM9b2ZmJjdjN2E=" />}

                    >
                        <div className="card-overlay">Service Benefits</div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        cover={<img alt="Card 3" cognitive_id={'5'} onClick={() => handleCardClick('https://www.volkswagen.com')} style={{ objectFit: 'cover', height: '300px' }} src="https://assets.volkswagen.com/is/image/volkswagenag/Warranty?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTc1MCZoZWk9MTAwMCZhbGlnbj0wLjAwLDAuMDAmYmZjPW9mZiY5MDlm" />}
                        onClick={() => handleCardClick('https://www.volkswagen.com')}
                    >
                        <div className="card-overlay">Extended Warranty</div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerService;
