
import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Grafo from '../grafo/grafo'

const HamiltonPage = () => {
    const [grafo, setGrafo] = useState(null);

    useEffect(() => {
        const nuevoGrafo = new Grafo();

        nuevoGrafo.addAristas("A", "B");
        nuevoGrafo.addAristas("A", "C");
        nuevoGrafo.addAristas("B", "D");
        nuevoGrafo.addAristas("C", "D");
        nuevoGrafo.addAristas("A", "E");

        console.log("Ejecutando");
        nuevoGrafo.mostrarGrafo();

        nuevoGrafo.deleteAristas("A", "C");
        console.log("Ejecutando pt2");
        nuevoGrafo.mostrarGrafo();

        setGrafo(nuevoGrafo);
    }, []);


    return (
        <Card title={'Problema del Ciclo Hamiltoniano'}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        title={'Problema propuesto por Edgar'}
                        style={{ width: '400px' }}
                    >
                        When the impostor is sus
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card
                        title={'Problema de la comunidad'}
                        style={{ width: '400px' }}
                    >
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}

export default HamiltonPage
