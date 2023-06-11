import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Loader from './Loader';

const CarFeaturesPage = () => {
    const [carImages, setCarImages] = useState([]);
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const [container1, setContainer1] = useState([]);
    const [container1Title, setContainer1Title] = useState("Volkswagen");
    const [container2, setConatiner2] = useState({ title: '', description: null, type: null });
    const [container4Header, setConatiner4Header] = useState('Safe First');
    const [container4Description, setConatiner4Description] = useState("When it comes to safety, we never take a backseat. Keeping you protected has always been part of the Volkswagen’s DNA. We laser-weld roofs, mimicking the sturdiness of a turtle shell. We double-check every nook and cranny, upside down and inside out. Even our paints are engineered to make our cars stronger.");
    const featureList = [
        {
            id: 1,
            image: 'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-1-5l-tsi-evo-1?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE2MDAmaGVpPTEyMDAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmMjRhZQ==',
            title: 'Active Cylinder Technology',
            description: "Get maximum power while keeping fuel consumption in check with Active Cylinder Technology on the 1.5L TSI EVO engine.",
        },
        {
            id: 2,
            image: 'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-7-speed-dsg?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE2MDAmaGVpPTEyMDAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmMjRhZQ==',
            description: "Seamless gear changes = a smoother driving experience with the 7-speed DSG in the Virtus.",
            title: '7-speed DSG'
        },
        {
            id: 3,
            image: 'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-airbags?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE2MDAmaGVpPTEyMDAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmMjRhZQ==',
            title: '6 airbags',
            description: "Safety never takes a backseat in the Virtus. Up to 6 airbags protect the car's occupants in the event of a critical incidence.",
        },
        {
            id: 4,
            image: 'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-usp-3?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE2MDAmaGVpPTEyMDAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmMjRhZQ==',
            description: "Powered by the revolutionary 1.0L TSI engine, the Virtus gives maximum power with minimum fuel consumption. Generating 115 PS of power and 178 Nm of torque, the Dynamic Line comes in 6-speed manual transmission or automatic transmission options.",
            title: 'Dynamic Line'
        },
    ];
    const [container3, setContainer3] = useState(featureList);
    const fallbackCarImages = [
        {
            id: 1, url: 'https://assets.volkswagen.com/is/image/volkswagenag/Virtus-Cross-Linking?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTEyODAmaGVpPTcyMCZhbGlnbj0wLjAwLDAuMDAmYmZjPW9mZiY5ZjIy', title: 'First slide label',
            description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
        },
        {
            id: 2, url: 'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-service?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==', title: 'First slide label',
            description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
        },
        {
            id: 3, url: 'https://assets.volkswagen.com/is/image/volkswagenag/Virtus-Awards?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==', title: 'First slide label',
            description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
        },
    ];




    // Fetch car images from API
    useEffect(() => {
        const fetchDynamicContent = async () => {
            try {
                const userId = localStorage.getItem('userId') ||  "test1"
                const response = await fetch(`http://localhost:5000/generatePage/${userId}`);
                setIsContentLoaded(true);
                const data = await response.json();
                setContainer1(data["id1"]);
                setContainer1Title(data["id2"]);
                setConatiner2(data["id3"]);
                setContainer3(data["id4"]);
                setConatiner4Header(data["id5"].title);
                setConatiner4Description(data["id5"].description);
            } catch (error) {
                console.error('Error fetching car images:', error);
                // Fallback to default car images
                setCarImages(fallbackCarImages);
            }
        };

        fetchDynamicContent();
    }, []);

    const renderCarouselItems = () => {
        return container1.length > 0 ? (
            container1.map((image) => (
                <Carousel.Item key={image}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={`Car Image ${image}`}
                        
                    />
                    <Carousel.Caption>
                        <h3>Das Auto</h3>
                        <p>{container1Title}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))
        ) : (
            fallbackCarImages.map((image) => (
                <Carousel.Item key={image.id}>
                    <img
                        className="d-block w-100"
                        src={image.url}
                        alt={`Car Image ${image.id}`}
                    />
                    <Carousel.Caption>
                        <h3>{image.title}</h3>
                        <p>{image.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))
        );
    };

    const convertArrayToListUI = (array, type) => {
        if (type === 'list') {
            const bulletPoints = array.map(item => `<li>${item}</li>`).join('');
            return `<ul>${bulletPoints}</ul>`;
        } else {
            return `<p>
            ${container2.description}
        </p>`
        }

    }

    const renderContent = () => {
        return (
            <div>
                {/* Carousal with dynamic images */}
                <Carousel>
                    {renderCarouselItems()}
                </Carousel>

                {/* Safety section */}
                <div className="d-flex justify-content-center align-items-center p-4">
                    <div className=" container text-center" >
                        <h1>{container2.title}</h1>
                        <div dangerouslySetInnerHTML={{__html:convertArrayToListUI(container2.description, container2.type) }} style={container2.type === 'string' ? {textAlign: 'centre'}: {textAlign: 'left',paddingLeft: '60px'} }>
                        </div>
                    </div>
                </div>


                {/* Feature list */}
                <div className="container">
                    <div className="row">
                        {container3.map((feature) => (
                            <div className="col-md-6" key={feature.id}>
                                <div className="feature">
                                    <img src={feature.image} className="img-fluid" style={{height:'400px'}} />
                                    <h3>{feature.feature}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">

                            <img
                                src="https://assets.volkswagen.com/is/image/volkswagenag/GNCAP-Taigun-Virtus?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw=="
                                alt="Image"
                                className="img-fluid"
                                style={{ marginRight: '10px' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <h3>{container4Header}</h3>
                            <p>{container4Description}​</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    return isContentLoaded ? renderContent() : <Loader />
};

export default CarFeaturesPage;
