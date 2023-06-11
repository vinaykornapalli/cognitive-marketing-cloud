import React, { useState, useEffect } from 'react';
import { Tabs, Button } from 'antd';
import $ from 'jquery'
import { pushData, pushDataSimple } from './utils';

const { TabPane } = Tabs;

const intents = ['safety', 'design', 'technology', 'performance']
const Features = () => {
  const [activeTab, setActiveTab] = useState('safety');

  const handleTabChange = (key) => {
    setActiveTab(key);
    const payload = {
      intent_id: intents.indexOf(key)
    }
    pushDataSimple(payload);
  };

  const handOnClick = (e) => {
      console.log(e);
  }

  useEffect(() => {
  
    intents.forEach((intent, id)=> {
        const elements = document.querySelectorAll(`[data-node-key="${intent}"]`);
        elements.forEach((element) => {
          element.setAttribute('intent_id', `${id}`);
          element.setAttribute('intent_desc', intent);
        });
    })

}, []);
  
  const fakeData = {
    safety: {
      title: "Safety",
      image: "https://assets.volkswagen.com/is/image/volkswagenag/GNCAP-Taigun-Virtus?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTE5MjAmaGVpPTEwODAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmM2E1Nw==",
      description: "When it comes to safety, we never take a backseat. Keeping you protected has always been part of the Volkswagen’s DNA. We laser-weld roofs, mimicking the sturdiness of a turtle shell. We double-check every nook and cranny, upside down and inside out. Even our paints are engineered to make our cars stronger. Read on to explore our stringent Volkswagen standards for quality and safety.",
      expand: false,
      partialDescription: "When it comes to safety, we never take a backseat. Keeping you protected has always been part of..."
    },
    design: {
      title: "Design",
      image: "https://centaur-wp.s3.eu-central-1.amazonaws.com/designweek/prod/content/uploads/2019/09/10104322/logo-explainer.jpg",
      description: "Volkswagen cars are renowned for their timeless and elegant design. The company's design philosophy combines sleek lines, refined curves, and a focus on functionality. Volkswagen vehicles often feature a clean and minimalist exterior, with attention to detail and high-quality craftsmanship. The interior design follows a user-friendly approach, providing a comfortable and ergonomic driving experience. From compact hatchbacks to spacious SUVs, Volkswagen cars exhibit a consistent design language that balances aesthetics and practicality.",
      expand: false,
      partialDescription: "Volkswagen cars are renowned for their timeless and elegant design. The company's design philosophy..."
    },
    technology: {
      title: "Technology",
      image: "https://assets.volkswagen.com/is/image/volkswagenag/MY-VW-Connect-1?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTEyODAmaGVpPTk2MCZhbGlnbj0wLjAwLDAuMDAmYmZjPW9mZiY0OTgw",
      description: "Volkswagen continuously integrates advanced technology into its vehicles to enhance safety, convenience, and connectivity. The brand incorporates innovative features such as advanced driver-assistance systems, including adaptive cruise control, lane-keeping assist, and automatic emergency braking, to ensure a safe driving environment. Volkswagen also focuses on infotainment and connectivity, offering touchscreen displays, smartphone integration, and intuitive interfaces that keep drivers connected and entertained on the road. Additionally, Volkswagen embraces electric mobility with its electric vehicle lineup, incorporating cutting-edge battery technology and charging infrastructure to support sustainable transportation solutions.",
      expand: false,
      partialDescription: "Volkswagen continuously integrates advanced technology into its vehicles to enhance safety,..."
    },
    performance: {
      title: "Performance",
      image: "https://assets.volkswagen.com/is/image/volkswagenag/Volkswagen-TSI-Engine?Zml0PWNyb3AsMSZmbXQ9d2VicCZxbHQ9Nzkmd2lkPTEyODAmaGVpPTcyMCZhbGlnbj0wLjAwLDAuMDAmYmZjPW9mZiY5ZjIy",
      description: "Volkswagen is known for delivering impressive performance across its vehicle lineup. The brand offers a range of engines, from efficient and responsive turbocharged engines to powerful and exhilarating performance-oriented powertrains. Volkswagen vehicles excel in terms of handling and agility, providing a dynamic driving experience. Whether it's quick acceleration, precise steering, or smooth ride quality, Volkswagen cars are engineered to deliver a balance between performance and everyday usability, appealing to both driving enthusiasts and those seeking a comfortable ride.",
      expand: false,
      partialDescription: "Volkswagen is known for delivering impressive performance across its vehicle lineup. The brand..."
    }
  }


  return (
    <div className="container">
        <h2 className='text-center'>Explore Features</h2>
      <Tabs activeKey={activeTab} onChange={handleTabChange} onTabClick={handOnClick} centered={true}>
      <TabPane tab="Safety" key="safety">
          <div className="feature-content">
            <div className="row">
              <div className="col-md-6">
                <img src={fakeData.safety.image} alt="Design" className="feature-image img-fluid" style={{height: '450px'}}/>
              </div>
              <div className="col-md-6">
                <div className="feature-description">
                  <h3>{fakeData.safety.title}</h3>
                  <p>{fakeData.safety.description}</p>
                  <div className='text-center' >
      <Button  type="primary" cognitive_id='3' intent_id='0' intent_desc='safety' target="_blank" href="https://www.volkswagen.co.in/en.html">Read More</Button>
      </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Design" key="design">
          <div className="feature-content">
            <div className="row">
              <div className="col-md-6">
                <img src={fakeData.design.image} alt="Design" className="feature-image img-fluid" style={{height: '450px'}}/>
              </div>
              <div className="col-md-6">
                <div className="feature-description">
                  <h3>{fakeData.design.title}</h3>
                  <p>{fakeData.design.description}</p>
                  <div className='text-center' >
      <Button  type="primary" cognitive_id='3' intent_id='1' intent_desc='design' target="_blank" href="https://www.volkswagen.co.in/en.html">Read More</Button>
      </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Technology" key="technology">
          <div className="feature-content">
            <div className="row">
              <div className="col-md-6">
                <img src={fakeData.technology.image} alt="Technology" className="feature-image img-fluid" style={{height: '450px'}}/>
              </div>
              <div className="col-md-6">
                <div className="feature-description">
                  <h3>{fakeData.technology.title}</h3>
                  <p>{fakeData.technology.description}</p>
                  <div className='text-center' >
      <Button  type="primary" cognitive_id='3' intent_id='2' intent_desc='technology' target="_blank" href="https://www.volkswagen.co.in/en.html">Read More</Button>
      </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Performance" key="performance">
          <div className="feature-content">
            <div className="row">
              <div className="col-md-6">
                <img src={fakeData.performance.image} alt="Performance" className="feature-image img-fluid"  style={{height: '450px'}}/>
              </div>
              <div className="col-md-6">
                <div className="feature-description">
                  <h3>{fakeData.performance.title}</h3>
                  <p>{fakeData.performance.description}</p>
                  <div className='text-center' >
      <Button  type="primary" cognitive_id='3' intent_id='3' intent_desc='performance' target="_blank" href="https://www.volkswagen.co.in/en.html">Read More</Button>
      </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
     
    </div>
  );
  
};

export default Features;
