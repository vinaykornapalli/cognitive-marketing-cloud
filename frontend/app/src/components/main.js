import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { faCoffee, faSteeringWheel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './main.css';
import Variants from './Variants';
import Features  from './Feature';
import ServiceCards from './Service';
import SocialMediaButtons from './social';
import CustomerService from './CustomerService';
import $ from 'jquery';


const Main = () => {
    const fallbackCarImages = [
        {
            id: 1, url: 'https://assets.volkswagen.com/is/image/volkswagenag/Virtus-Cross-Linking?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTEyODAmaGVpPTcyMCZhbGlnbj0wLjAwLDAuMDAmYmZjPW9mZiY5ZjIy', 
            title: 'Volkswagen: Driven by Excellence',
        },
        {
            id: 2, url: 'https://assets.volkswagen.com/is/image/volkswagenag/volkswagen-virtus-service?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
            title: 'Volkswagen: Driven by Excellence',
        },
        {
            id: 3, url: 'https://assets.volkswagen.com/is/image/volkswagenag/Virtus-Awards?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==',
            title: 'Volkswagen: Driven by Excellence',
        },
    ];
    const renderCarouselItems = () => {
        return (
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

    useEffect(() => {
        // Use the 'attr()' method to add the 'cognitive_id' attribute to the existing button
        $('.carousel-control-prev-icon').attr('cognitive_id', '1');
        $('.carousel-control-next-icon').attr('cognitive_id', '1');
    }, []);

    const renderCardItems = () => {
        return (
            <div >
                <div className="row">
                    <div className="col-3">
                        <div className="card cardRender">
                            <div className="card-body ">
                                <h5 className="card-title">Book A Test Drive</h5>
                                <p className="card-text">Arrange a test drive through the nearest retailer.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card cardRender">
                            <div className="card-body">
                                <h5 className="card-title"> <a href="#" cognitive_id="2" style={{color: 'black'}}>Build Your Own</a></h5>
                                <i className="fas fa-car"></i> {/* Assuming you have Font Awesome icons */}
                                <p className="card-text">You can build your own car.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card cardRender">
                            <div className="card-body">
                                <h5 className="card-title">View Prices</h5>
                                <i className="fas fa-book-open"></i> {/* Assuming you have Font Awesome icons */}
                                <p className="card-text">Check prices here.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card cardRender">
                            <div className="card-body">
                                <h5 className="card-title">Reserve Online</h5>
                                <i className="fas fa-desktop"></i> {/* Assuming you have Font Awesome icons */}
                                <p className="card-text">Reserve online here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const [expandedBox1, setExpandedBox1] = useState(false);

    const handleExpandClick = () => {
        setExpandedBox1(!expandedBox1);
    };
    return (
        <div >
            <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'white' }}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><svg role="img" aria-label="Volkswagen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><title>Volkswagen</title><path d="M12 22.586c-5.786 0-10.543-4.8-10.543-10.586 0-1.2.214-2.357.6-3.471l6.172 12c.085.171.171.3.385.3.215 0 .3-.129.386-.3l2.871-6.386c.043-.086.086-.129.129-.129.086 0 .086.086.129.129l2.914 6.386c.086.171.171.3.386.3.214 0 .3-.129.385-.3l6.172-12c.385 1.071.6 2.228.6 3.471-.043 5.786-4.8 10.586-10.586 10.586Zm0-13.329c-.086 0-.086-.086-.129-.128l-3.3-7.115a10.117 10.117 0 0 1 6.858 0l-3.3 7.115c-.043.042-.043.128-.129.128Zm-3.471 7.714c-.086 0-.086-.085-.129-.128L3 6.47c.943-1.542 2.314-2.828 3.9-3.728l3.814 8.228c.086.172.172.215.3.215h1.972c.128 0 .214-.043.3-.215l3.771-8.228c1.586.9 2.957 2.186 3.9 3.728L15.6 16.843c-.043.086-.086.128-.129.128-.085 0-.085-.085-.128-.128L13.286 12.3c-.086-.171-.172-.214-.3-.214h-1.972c-.128 0-.214.043-.3.214l-2.057 4.543c-.043.043-.043.128-.128.128ZM12 24c6.643 0 12-5.357 12-12S18.643 0 12 0 0 5.357 0 12s5.357 12 12 12Z"></path></svg></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle"  cognitive_id="0"  href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown" >
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div >
                <Carousel>
                    {renderCarouselItems()}
                </Carousel>
            </div>
            <div>
                {renderCardItems()}
            </div>
            {/* <div className="container-xxl" style={{paddingTop: '50px', paddingBottom: '30px'}}>
                <h2 className="text-center">Explore Features</h2>
                <div className="row containerPadder">
                    <div className="col-md-8">

                        <img
                            src="https://assets.volkswagen.com/is/image/volkswagenag/GNCAP-Taigun-Virtus?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw=="
                            alt="Image"
                            className="img-fluid"
                            style={{ marginRight: '10px' }}
                        />
                    </div>
                    <div className="col-md-4">
                        <h3>Safe like a Volkswagen</h3>
                        <p>
                            When it comes to safety, we never take a backseat. Keeping you protected has always been part of the Volkswagen’s DNA. We laser-weld roofs, mimicking the sturdiness of a turtle shell. We double-check every nook and cranny, upside down and inside out. Even our paints are engineered to make our cars stronger.
                            {expandedBox1 && (
                                <>
                                    <br />
                                    Read on to explore our stringent Volkswagen standards for quality and safety.
                                </>
                            )}
                        </p>
                        <Button type="primary" cognitive_id='3' onClick={handleExpandClick}>{expandedBox1 ? 'Read Less' : 'Read More'}</Button>
                    </div>
                </div>
            </div> */}
            {/* <div className="container-xxl">
                <div className="row containerPadder">
                    <div className="col-md-4">
                        <h3>EMI Calculator</h3>
                        <p>Calculate the EMI of your future Volkswagen in the most easy and convenient way with our EMI Calculator.​</p>

                    </div>
                    <div className="col-md-8">
                        <img
                            src="https://assets.volkswagen.com/is/image/volkswagenag/emi-calculator?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw=="
                            alt="Image"
                            className="img-fluid"
                            style={{ marginRight: '10px' }}
                        />
                    </div>
                </div>
            </div> */}
            {/* <div className="container-xxl">
                <div className="row containerPadder">
                    <div className="col-md-8">

                        <img
                            src="https://assets.volkswagen.com/is/image/volkswagenag/GNCAP-Taigun-Virtus?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw=="
                            alt="Image"
                            className="img-fluid"
                            style={{ marginRight: '10px' }}
                        />
                    </div>
                    <div className="col-md-4">
                        <h3>Gear up to cruise through those rainy days</h3>
                        <p>With exciting offers on Volkswagen Service Products</p>
                        <ul style={{ textAlign: 'left' }}>
                            <li>Up to INR 4 500 off on Add-On</li>
                            <li>Up to INR 4 000 off on Extended Warranty</li>
                            <li>Up to INR 2 500 off on Service Value Packages*</li>
                        </ul>
                    </div>
                </div>
            </div> */}
                        <div style={{paddingTop: '50px', paddingBottom: '30px'}}>
                <Features />
            </div>
            <div style={{paddingTop: '50px', paddingBottom: '30px'}}> 
                <Variants />
            </div>
            <div style={{paddingTop: '50px', paddingBottom: '30px'}}>
                <ServiceCards/>
            </div>

            <div style={{paddingTop: '50px', paddingBottom: '30px'}}>
                <SocialMediaButtons/>
            </div>
            <div style={{paddingTop: '50px', paddingBottom: '30px'}}>
                <CustomerService/>
            </div>
        </div>
    )
}

export default Main;