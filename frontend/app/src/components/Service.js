import { Card, Col, Container, Row } from 'react-bootstrap';

const ServiceCards = () => {
  return (
    <Container>
         <h2 className='text-center'>Social Responsibility</h2>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://assets.volkswagen.com/is/image/volkswagenag/Volkswagen-Vento-Symbiosis-Skills-Open-University?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTk2MCZoZWk9OTYwJmFsaWduPTAuMDAsMC4wMCZiZmM9b2ZmJmI0NjI="
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <Card.Body>
              <Card.Text>
                Volkswagen donates a Vento car to Symbiosis Skills and Open University{' '}
                <a href="#" style={{ color: 'darkblue' }} cognitive_id='2'>
                  See all projects
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://assets.volkswagen.com/is/image/volkswagenag/Phadkewasti-Nighoje-Village-Chakan-Pune-School?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTk2MCZoZWk9NzIwJmFsaWduPTAuMDAsMC4wMCZiZmM9b2ZmJjBhMDQ="
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <Card.Body>
              <Card.Text>
                Volkswagen India builds an environment-friendly Primary School for the children of Phadkewasti, Nighoje Village, Chakan, Pune{' '}
                <a href="#" style={{ color: 'darkblue' }} cognitive_id='2'>
                  See all projects
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://assets.volkswagen.com/is/image/volkswagenag/Volkswagen-India-Water-Tank-Food-Grains-Storage-Room?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTgxMCZoZWk9MTA4MCZhbGlnbj0wLjAwLDAuMDAmYmZjPW9mZiY2OGFl"
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <Card.Body>
              <Card.Text>
                Volkswagen India builds an underground water tank and food grains storage room at Gurukulam, Chinchwadgaon, Pune{' '}
                <a href="#" style={{ color: 'darkblue' }} cognitive_id='2'>
                  See all projects
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceCards;
