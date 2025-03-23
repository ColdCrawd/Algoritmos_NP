import React, { useEffect, useState } from "react";
import "./board.css";
import CaballoIcon from "./caballo";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const Tablero = ({ grafo , posicionCaballo, setPosicionCaballo, tam, camino}) => {
    const [movimientos, setMovimientos] = useState([]);
    const [highlightedSquare, setHighlightedSquare] = useState([]);

    useEffect(() => {
        if (grafo) {
            setMovimientos([]);
            setHighlightedSquare([]);
        }
    }, [grafo]);

    useEffect(() => {
        if (posicionCaballo !== null) {
            console.log("Posición del caballo: ", posicionCaballo);
        }
    }, [posicionCaballo]);

    const colocarCaballo = (x, y) => {
        // const nuevosMovimientos = grafo.colocarCaballo(x, y);
        setPosicionCaballo(`${x},${y}`);
        // setMovimientos(nuevosMovimientos);
    };

    useEffect(() => {
        if(camino && camino.length > 0){
            mostrarCamino();
        }
    }, [camino]);

    const mostrarCamino = async () => {
        for (let i = 0; i < camino.length; i++) {
            let [x, y] = camino[i].label ? camino[i].label.split(',').map(Number) : camino[i].split(',').map(Number);
            colocarCaballo(x, y);
            await sleep(1000);
            setHighlightedSquare(prevState => [...prevState, `${x},${y}`]);
        }
        let [x, y] = camino[0].label ? camino[0].label.split(',').map(Number) : camino[0].split(',').map(Number);
        colocarCaballo(x, y);
        setHighlightedSquare([]);

    }

    return (
        <div id="gameboard">
            {[...Array(tam)].map((_, i) => (
                <div key={i} className="row">
                    {[...Array(tam)].map((_, j) => {
                        const pos = `${i},${j}`;
                        const esCaballo = posicionCaballo === pos;
                        const esHighlighted = highlightedSquare.includes(pos);

                        return (
                            <div
                                key={pos}
                                className={`square ${(i + j) % 2 === 0 ? "beige" : "brown"} ${esHighlighted ? "highlight" : ""}`}
                                onClick={() => colocarCaballo(i, j)}
                            >
                                {esCaballo && <CaballoIcon />}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Tablero;
