import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Radio, Row } from 'antd'
import React, { useState } from 'react'
import MapTSP from './Map';

const options = [
    {
        label: 'Solucion del Estudiante',
        value: 0,
    },
    {
        label: 'Solucion de la comunidad',
        value: 1,
    },
];

const limits = {
    lngMin: -125.0,
    lngMax: -66.93457,
    latMin: 24.396308,
    latMax: 49.384358,
};

const TravelProblem = () => {
    const [directions, setDirections] = useState([]);

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <Card title={'Mapa'}>
                   <MapTSP directions={directions}/>
                </Card>
            </Col>
            <Col xs={24} md={12}>
                <Card title={'Direcciones'} style={{ width: '100%' }}>
                    <Form 
                        layout='vertical' 
                        variant={'underlined'} 
                        onFinish={(values)=> console.log(values)}                        
                         onValuesChange={(_, allValues) => {setDirections(allValues.directions)}}
                    >
                        <Form.List
                            name="directions"
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 2) {
                                            return Promise.reject(new Error('Deberia haber al menos 2 direcciones'));
                                        }
                                    },
                                },
                            ]}
                            onChange={(values) => console.log(values)}
                            style={{ width: '100%', maxHeight: '50px', overFlowy: 'auto' }}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    <div style={{ maxHeight: '373px', overflowY: 'auto' }}>
                                        {fields.map((field,index) => (
                                            <Form.Item
                                                required={false}
                                                key={`${field.key}-${index}`} 
                                            >
                                                <Row>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'latitude']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Por favor ingresar la latitud.",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            type="number"
                                                            placeholder="Latitud"
                                                            style={{
                                                                width: '40%',
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, 'longitude']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Por favor ingresar la longitud.",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            type="number"
                                                            placeholder="Longitud"
                                                            style={{
                                                                width: '40%',
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 1 ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                        />
                                                    ) : null}
                                                </Row>
                                            </Form.Item>
                                        ))}
                                    </div>
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add({ longitude: Math.random() * (limits.lngMax - limits.lngMin) + limits.lngMin, latitude: Math.random() * (limits.latMax - limits.latMin) + limits.latMin, })}
                                            style={{
                                                width: '100%',
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Agregar nueva Dirección
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item>
                            <Radio.Group block options={options} defaultValue={0} buttonStyle="solid" optionType="button" />
                        </Form.Item>

                        <Form.Item
                            style={{ width: '100%' }}
                        >
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Ejecutar Solucion
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default TravelProblem
