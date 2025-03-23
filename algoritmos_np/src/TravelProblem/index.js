import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Radio, Row, Typography } from 'antd'
import {getRouteByCommunitySolution, getRouteByStudentSolution} from './actions'
import React, { useState } from 'react'
import MapTSP from './Map';

const { Title,  } = Typography;

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
    const [loading,setLoading] = useState(false)
    const [directions, setDirections] = useState([]);
    const [orderedDirections, setOrderedDirections] = useState([])
    const [distanceCost, setDistanceCost]=useState(0);
    const [time, setTime] = useState(0);  

    const onFinish = async (values) => {
        try 
        {
            setLoading(true)
            const response = values.solutionType === 0 ? await getRouteByStudentSolution(values) : await getRouteByCommunitySolution(values); ;
            const orderedCities = response.route.map(index => directions[index]);
            setDistanceCost(response.totalCost);
            setTime(response.time);
            setOrderedDirections(orderedCities)
        }
        catch (error) {
            message.error('Error al obtener la solucion')
        }finally{
            setLoading(false)
        }
        
        
    }
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <Card title={'Mapa'}>
                   <MapTSP directions={directions} orderedDirections={orderedDirections}/>
                </Card>
            </Col>
            <Col xs={24} md={12}>
                <Card title={'Direcciones'} style={{ width: '100%' }}>
                    <Form 
                        layout='vertical' 
                        variant={'underlined'} 
                        onFinish={onFinish}                        
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

                        <Form.Item name={'solutionType'} initialValue={0}>
                            <Radio.Group block options={options} defaultValue={0} buttonStyle="solid" optionType="button" />
                        </Form.Item>

                        <Form.Item
                            style={{ width: '100%' }}
                        >
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading = {loading}>
                                Ejecutar Solucion
                            </Button>
                        </Form.Item>
                    </Form>
                    {distanceCost !== 0 && time !== 0 && (
                        <Col xs={24} md={24}>
                            <Title level={2}>Resultados</Title>
                            <Title level={4}>Distancia: {distanceCost.toFixed(2)} Km</Title>
                            <Title level={4}>Tiempo: {time.toFixed(4)} ms</Title>
                        </Col>
                    )}
                </Card>
            </Col>
        </Row>
    )
}

export default TravelProblem
