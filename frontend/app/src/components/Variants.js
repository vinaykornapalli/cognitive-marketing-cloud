import React, { useState, useEffect } from 'react';
import { Tabs, Table } from 'antd';
import { pushDataSimple } from './utils';
import $ from 'jquery';
const TabPane = Tabs.TabPane;
const carData = [
    {
        key: '0',
        label: 'Virtus'
    },
    {
        key: '1',
        label: 'Tiguan'
    }
];

const columns = [
    {
        title: 'Variant',
        dataIndex: 'variant',
        key: 'variant',
    },
    {
        title: 'Transmission',
        dataIndex: 'transmission',
        key: 'transmission',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    }
];

const virtusVariants = [
    {
        key: 1,
        variant: 'Comfortline - 1.0L TSI MT',
        transmission: 'manual',
        displacement: '120ps',
        price: '11,47,900.00',
        description: 'Manual Transmission\nFuel efficiency: 19.40 km/l\nLED Headlamps with LED DRL\nSignature LED tail lamps\nChrome strip on grille (Upper)\nPremium dual tone interiors\nRear seat backrest 100% foldable\n8 speakers\nEngine idle start/stop\nApp-Connect with Android AutoTM, Apple CarPlayTM\n17.78 cm Touchscreen infotainment\nElectronic stability control (ESC)\nRear Fog Lamps\nMy name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
        key: 2,
        variant: 'Highline - 1.0L TSI MT',
        transmission: 'automatic',
        displacement: '120ps',
        price: '13,37,900.00',
        description: 'Manual Transmission\nFuel efficiency: 19.40 km/l\nLED Headlamps with LED DRL\nSignature LED tail lamps\nChrome strip on grille (Upper)\nPremium dual tone interiors\nRear seat backrest 100% foldable\n8 speakers\nEngine idle start/stop\nApp-Connect with Android AutoTM, Apple CarPlayTM\n17.78 cm Touchscreen infotainment\nElectronic stability control (ESC)\nRear Fog Lamps\nMy name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
        key: 3,
        variant: 'Highline - 1.0L TSI AT',
        transmission: 'manual',
        displacement: '120ps',
        price: '14,67,900.00',
        description: 'Manual Transmission\nFuel efficiency: 19.40 km/l\nLED Headlamps with LED DRL\nSignature LED tail lamps\nChrome strip on grille (Upper)\nPremium dual tone interiors\nRear seat backrest 100% foldable\n8 speakers\nEngine idle start/stop\nApp-Connect with Android AutoTM, Apple CarPlayTM\n17.78 cm Touchscreen infotainment\nElectronic stability control (ESC)\nRear Fog Lamps\nMy name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    }

]

const tiguanVariants = [
    {
        key: 1,
        variant: '1.0L TSI MT',
        transmission: 'manual',
        displacement: '120ps',
        price: '11,47,900.00',
        description: 'Manual Transmission\nFuel efficiency: 19.40 km/l\nLED Headlamps with LED DRL\nSignature LED tail lamps\nChrome strip on grille (Upper)\nPremium dual tone interiors\nRear seat backrest 100% foldable\n8 speakers\nEngine idle start/stop\nApp-Connect with Android AutoTM, Apple CarPlayTM\n17.78 cm Touchscreen infotainment\nElectronic stability control (ESC)\nRear Fog Lamps\nMy name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
        key: 2,
        variant: 'Highline - 1.0L TSI MT',
        transmission: 'automatic',
        displacement: '120ps',
        price: '13,37,900.00',
        description: 'Manual Transmission\nFuel efficiency: 19.40 km/l\nLED Headlamps with LED DRL\nSignature LED tail lamps\nChrome strip on grille (Upper)\nPremium dual tone interiors\nRear seat backrest 100% foldable\n8 speakers\nEngine idle start/stop\nApp-Connect with Android AutoTM, Apple CarPlayTM\n17.78 cm Touchscreen infotainment\nElectronic stability control (ESC)\nRear Fog Lamps\nMy name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
        key: 3,
        variant: 'Highline - 1.0L TSI AT',
        transmission: 'manual',
        displacement: '120ps',
        price: '14,67,900.00',
        description: 'Manual Transmission\nFuel efficiency: 19.40 km/l\nLED Headlamps with LED DRL\nSignature LED tail lamps\nChrome strip on grille (Upper)\nPremium dual tone interiors\nRear seat backrest 100% foldable\n8 speakers\nEngine idle start/stop\nApp-Connect with Android AutoTM, Apple CarPlayTM\n17.78 cm Touchscreen infotainment\nElectronic stability control (ESC)\nRear Fog Lamps\nMy name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    }

]

function Variants() {
    const [activeTab, setActiveTab] = useState('virtus');
    const handleTabChange = (key) => {
        setActiveTab(key);
        const payload = {
            cognitive_id: '6'
          }
          pushDataSimple(payload);
    };

    const handleOnExpand = (expanded) => {
        const payload = {
            cognitive_id: '4'
          }
         expanded && pushDataSimple(payload); 
    }
    
    useEffect(() => {
        // Use the 'attr()' method to add the 'cognitive_id' attribute to the existing button
        $('.ant-table-row-expand-icon').attr('cognitive_id', '4');
    }, []);


    useEffect(() => {
        const intents = ['virtus', 'tiguan']
        intents.forEach((intent, id)=> {
            const elements = document.querySelectorAll(`[data-node-key="${intent}"]`);
            elements.forEach((element) => {
              element.setAttribute('cognitive_id', `6`);
            });
        })
    
    }, []);

    return (
        <div className="container mt-4">
             <h2 className='text-center'>Variants</h2>
            <Tabs activeKey={activeTab} oitems={carData} onChange={handleTabChange}>
                <TabPane tab="Virtus" key="virtus">
                    <Table onExpand={handleOnExpand}
                        columns={columns}
                        expandable={{
                            expandedRowRender: (record) => (
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {record.description}
                                </p>
                            ),
                            rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                        dataSource={virtusVariants}
                    />
                </TabPane>
                <TabPane tab="Tiguan" key="tiguan">
                    <Table onExpand={handleOnExpand}
                        columns={columns}
                        expandable={{
                            expandedRowRender: (record) => (
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {record.description}
                                </p>
                            ),
                            rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                        dataSource={tiguanVariants}
                    />
                </TabPane>
            </Tabs><Tabs />

        </div>
    );
}


export default Variants;
