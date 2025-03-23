import { SearchOutlined } from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import ProblemTravel from './images/Problem1.jpg'
import ProblemHamilton from './images/Grafohamilton.png'
import ProblemKnapsack from './images/knapsack.png'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const { Title, Paragraph } = Typography;


const PrincipalPage = () => {
  const navigate = useNavigate();

  return (
    <Card title={'Algoritmos NP'}>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
                <Card
                    title = {'Problema del Agente Viajero'}
                    style={{ width: '400px' }}
                    cover={
                    <img
                        alt="example"
                        src={ProblemTravel}
                    />
                    }
                    actions={[<SearchOutlined key="edit" onClick={()=>navigate(`/travel`)}/>]}
                >
                    <Typography>
                        <Title level={4}>Descripción</Title>
                        <Paragraph>
                        El problema del agente viajero (TSP) es un problema de optimización combinatoria. 
                        Consiste en encontrar la ruta más corta posible que permita visitar un conjunto de ciudades exactamente una vez y regresar a la ciudad de origen.
                        </Paragraph>
                        <Title level={4}>Importancia</Title>
                        <Paragraph>
                        Este problema tiene aplicaciones en la logística, la planificación de rutas, y la optimización de procesos. 
                        Resolverlo eficientemente puede reducir costos y mejorar la eficiencia en diversas industrias.
                        </Paragraph>
                        <Title level={4}>Ejemplo</Title>
                        <Paragraph>
                        Imagina que un vendedor debe visitar varias ciudades. El objetivo es encontrar la ruta más corta que le permita visitar todas las ciudades y regresar al punto de partida.
                        </Paragraph>
                        <Title level={4}>Desafíos</Title>
                        <Paragraph>
                        El problema del agente viajero es NP-completo, lo que significa que no se conoce un algoritmo eficiente para resolver 
                        todos los casos posibles en tiempo polinómico. Esto lo convierte en un problema desafiante y de gran interés para los 
                        investigadores en ciencias de la computación.
                        </Paragraph>
                    </Typography>

                </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
                <Card
                    title = {'Problema del Ciclo Hamiltoniano'}
                    style={{ width: '400px' }}
                    cover={
                    <img
                        alt="example"
                        src={ProblemHamilton}
                    />
                    }
                    actions={[<SearchOutlined key="edit" onClick={()=>navigate(`/hamilton`)}/>]}
                >
                    <Typography>
                    <Title level={4}>Descripción</Title>
                    <Paragraph>
                    El problema del ciclo hamiltoniano es un problema clásico de la teoría de grafos. 
                    Consiste en determinar si existe un ciclo en un grafo que visite cada vértice exactamente una vez.
                    </Paragraph>
                    <Title level={4}>Importancia</Title>
                    <Paragraph>
                    Este problema es importante en diversas áreas como la optimización, la teoría de la computación y la investigación operativa. 
                    Encontrar una solución eficiente para este problema puede tener aplicaciones significativas en la planificación de rutas, 
                    la organización de circuitos y la bioinformática.
                    </Paragraph>
                    <Title level={4}>Ejemplo</Title>
                    <Paragraph>
                    Considera un grafo con los vértices A, B, C y D. Un ciclo hamiltoniano en este grafo podría ser A - B - C - D - A, 
                    donde cada vértice es visitado exactamente una vez antes de regresar al vértice inicial.
                    </Paragraph>
                    <Title level={4}>Desafíos</Title>
                    <Paragraph>
                    El problema del ciclo hamiltoniano es NP-completo, lo que significa que no se conoce un algoritmo eficiente para resolver 
                    todos los casos posibles en tiempo polinómico. Esto lo convierte en un problema desafiante y de gran interés para los 
                    investigadores en ciencias de la computación.
                    </Paragraph>
                    </Typography>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
                <Card
                    title = {'Problema de Knapsack'}
                    style={{ width: '400px' }}
                    cover={
                    <img
                        alt="example"
                        src={ProblemKnapsack}
                    />
                    }
                    actions={[<SearchOutlined key="edit" onClick={()=>navigate(`/knapsack`)}/>]}
                >
                    <Typography>
                        <Title level={4}>Descripción</Title>
                        <Paragraph>
                        El problema de la mochila (Knapsack) es un problema de optimización combinatoria. 
                        Se trata de seleccionar un subconjunto de elementos con pesos y valores dados, 
                        de manera que el valor total sea lo más alto posible sin exceder un peso máximo permitido.
                        </Paragraph>
                        <Title level={4}>Importancia</Title>
                        <Paragraph>
                        Este problema tiene aplicaciones en diversas áreas como la economía, la logística y la informática. 
                        Resolverlo eficientemente puede ayudar en la toma de decisiones sobre la asignación de recursos limitados.
                        </Paragraph>
                        <Title level={4}>Ejemplo</Title>
                        <Paragraph>
                        Imagina que tienes una mochila con una capacidad de 50 kg y varios objetos con diferentes pesos y valores. 
                        El objetivo es maximizar el valor total de los objetos que puedes llevar sin exceder la capacidad de la mochila.
                        </Paragraph>
                        <Title level={4}>Desafíos</Title>
                        <Paragraph>
                        El problema de la mochila es NP-completo, lo que significa que no se conoce un algoritmo eficiente para resolver 
                        todos los casos posibles en tiempo polinómico. Esto lo convierte en un problema desafiante y de gran interés para los 
                        investigadores en ciencias de la computación.
                        </Paragraph>
                    </Typography>
                </Card>
            </Col>
      </Row>
    </Card>
  )
}

export default PrincipalPage
