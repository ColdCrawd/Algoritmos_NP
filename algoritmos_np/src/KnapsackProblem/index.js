import React, { useState } from 'react'
import { Button, Card, Col, Form, InputNumber, message, Radio, Row, Typography, } from 'antd'
import EditTable from './editableTable';
import CommonTable from './table';
import { getKnapsackByCommunitySolution, getKnapsackByStudentSolution } from './actions';

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

const KnapsackPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [values, setValues]=useState(0);
    const [time, setTime] = useState(0);    
    const [messageApi, contextHolder] = message.useMessage();

    const [Knapsack, setKnapsack] = useState([]);
    const [form] = Form.useForm();

    const onFinish = async(values) => {
        
        if(dataSource.length === 0){
            console.log('dataSource', dataSource.length);
            messageApi.open({
                type: 'error',
                content: 'No hay productos para calcular',
            });
            return
        }
        try {
            setLoading(true);
            const response = values.solutionType === 0 ? await getKnapsackByStudentSolution(dataSource, values.pesoMax) : await getKnapsackByCommunitySolution(dataSource, values.pesoMax);
            console.log('response', response);
            const filteredDataSource = dataSource.filter(item =>
                response.res.items.some(responseItem => responseItem === item.key)
            );
            console.log('filteredDataSource', filteredDataSource);
            setValues(response.res.value);
            setTime(response.time);
            setKnapsack(filteredDataSource);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Sucedio un error al calcular la mochila',
            });
        }finally{
            setLoading(false);
        }
        
    }
  return (
    <>
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <Card title={'Productos'}>
                    <EditTable dataSource={dataSource} setDataSource={setDataSource} form={form}/>
                </Card>
            </Col>
            <Col xs={24} md={12}>
            {contextHolder}
                <Card title={'Mochila'} style={{ width: '100%' }}>
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item 
                            label={'Peso maximo de la mochila'} 
                            name='pesoMax'
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingrese el peso maximo de la mochila",
                                },
                            ]}>
                        <InputNumber style={{width:'100%'}} min={0}/>
                        </Form.Item>

                        <Form.Item name={'solutionType'} initialValue={0}>
                                    <Radio.Group block options={options} defaultValue={0} buttonStyle="solid" optionType="button" />
                                </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' style={{width: '100%'}} loading={loading}>Calcular</Button>
                        </Form.Item>
                    </Form>
                    <CommonTable dataSource={Knapsack} loading={loading}/>
                    {values !== 0 && time !== 0 && (
                        <Col xs={24} md={24}>
                            <Title level={2}>Resultados</Title>
                            <Title level={4}>Valor de artículos en mochila: {values}</Title>
                            <Title level={4}>Tiempo en ms: {time.toFixed(4)}</Title>
                        </Col>
                    )}
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default KnapsackPage
