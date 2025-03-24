import { Card, Col, Row, Button, Form, Radio, InputNumber,Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Grafo from './Grafo'
import "./board.css"
import Tablero from './tablero.js'

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

const HamiltonPage = () => {
    const [grafo, setGrafo] = useState(null);
    const [posicionCaballo, setPosicionCaballo] = useState(null);
    const [camino, setCamino] = useState([]);
    const [tiempo, setTiempo] = useState(0);
    const [tam, setTam] = useState(6);
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        const nuevoGrafo = new Grafo(tam);
        nuevoGrafo.generarTodasAristas();
        nuevoGrafo.mostrarGrafo();
        setGrafo(nuevoGrafo);
        setPosicionCaballo(null)
    }, [tam]);

    const enviarBackend = async () => {
        const grafoJSON = grafo.toJSON();
        console.log(grafoJSON);
        console.log(posicionCaballo);

        const ruta = selectedOption === 0
            ? "http://localhost:3001/api/problems/studentHamiltonSolution"
            : "http://localhost:3001/api/problems/comunityHamiltonSolution";

        try {
            const response = await fetch(ruta, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ grafo: grafoJSON, inicio: posicionCaballo }),
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data.resultado);
            if (data.success) {
                setCamino(data.resultado.camino);
                setTiempo(data.resultado.tiempo);
            } else {
                console.error("Error al obtener el ciclo Hamiltoniano");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
        }
    }

    const valueOnChange = (value) => {
        console.log("Nuevo valor recibido:", value)
        setTam(value);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };


    return (
        <Card title={'Problema del Ciclo Hamiltoniano'}>
            
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card
                        title={'Problema propuesto por Edgar'}
                        style={{ width: '100%' }}
                    >
                        <Title level={4}>Seleccione la posición inicial del caballo</Title>
                        {grafo && <Tablero
                            grafo={setGrafo}
                            posicionCaballo={posicionCaballo}
                            setPosicionCaballo={setPosicionCaballo}
                            tam={tam}
                            camino={camino}
                        />}
                        <p />
                        <Title level={4}>Tamaño del tablero</Title>
                        <InputNumber min={4} max={8} defaultValue={6} onChange={valueOnChange} />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card
                        title={'Problema de la comunidad'}
                        style={{ width: '100%' }}
                    >
                        <Form
                            layout='vertical'
                            variant={'underlined'}
                            onFinish={(values) => console.log(values)}
                        >

                            <Form.Item>
                                <Radio.Group block options={options} defaultValue={0} buttonStyle="solid" optionType="button"
                                    onChange={handleOptionChange} />
                            </Form.Item>

                            <Form.Item
                                style={{ width: '100%' }}
                            >
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }} onClick={enviarBackend}>
                                    Ejecutar Solucion
                                </Button>
                            </Form.Item>
                            {tiempo !== 0 && (
                                <Col xs={24} md={24}>
                                    <Title level={2}>Resultados</Title>
                                    {camino == null && <Title level={4}>No hay ciclo Hamiltoliano</Title>}
                                    <Title level={4}>Tiempo en ms: {tiempo.toFixed(4)}</Title>
                                    
                                </Col>
                            )}
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}

export default HamiltonPage
