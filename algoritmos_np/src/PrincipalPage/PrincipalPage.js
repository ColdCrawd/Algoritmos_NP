import { SearchOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import ProblemTravel from './images/Problem1.jpg'
import React from 'react'
import { useNavigate } from 'react-router-dom'

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
                    <p>
                    El Problema del Agente Viajero (TSP, por sus siglas en inglés) es un problema de optimización combinatoria que busca determinar la ruta más corta posible que permita a un agente viajar a través de un conjunto de ciudades, visitando cada ciudad exactamente una vez y regresando a la ciudad de origen. Este problema es conocido por ser NP-completo, lo que significa que no existe un algoritmo eficiente conocido para resolverlo en todos los casos.
                    </p>
                    <p>
                    El TSP tiene aplicaciones en diversas áreas, como la logística, la planificación de rutas, la fabricación y la genética. Por ejemplo, en la logística, se puede utilizar para optimizar las rutas de entrega de paquetes, minimizando el tiempo y el costo de transporte. En la fabricación, se puede aplicar para optimizar el recorrido de una máquina que debe realizar operaciones en diferentes puntos de una pieza.
                    </p>
                    <p>
                    Existen varias aproximaciones para resolver el TSP, que van desde métodos exactos hasta heurísticas y metaheurísticas. Los métodos exactos, como la programación lineal entera y la ramificación y poda, garantizan encontrar la solución óptima, pero pueden ser computacionalmente costosos para grandes conjuntos de ciudades. Las heurísticas, como el algoritmo del vecino más cercano y el algoritmo de inserción, proporcionan soluciones rápidas pero no garantizan la optimalidad. Las metaheurísticas, como el algoritmo genético, el recocido simulado y la búsqueda tabú, buscan un equilibrio entre la calidad de la solución y el tiempo de cómputo.
                    </p>
                    <p>
                    A pesar de su simplicidad en la formulación, el TSP sigue siendo un área activa de investigación debido a su complejidad y su relevancia práctica. Los avances en algoritmos y técnicas de optimización continúan mejorando nuestra capacidad para abordar este y otros problemas NP-completos, acercándonos cada vez más a soluciones eficientes para problemas complejos del mundo real.
                    </p>
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
                <Card
                    title = {'Problema del Ciclo Hamiltoniano'}
                    style={{ width: '400px' }}
                    cover={
                    <img
                        alt="example"
                        src={ProblemTravel}
                    />
                    }
                    actions={[<SearchOutlined key="edit" onClick={()=>navigate(`/hamilton`)}/>]}
                    >
                </Card>
            </Col>
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
                    actions={[<SearchOutlined key="edit" onClick={()=>navigate(`/problem3`)}/>]}
                    >
                </Card>
            </Col>
      </Row>
    </Card>
  )
}

export default PrincipalPage
