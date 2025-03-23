import Node from "./node.js";

class Grafo {
    constructor(n) {
        this.n = n;
        this.listaAdyacencia = new Map();
        this.movimientosCaballo = [
            [-2, -1], [-1, -2], [1, -2], [2, -1],
            [2, 1], [1, 2], [-1, 2], [-2, 1]
        ];
        this.inicializarTablero();
        this.generarTodasAristas();
    }

    inicializarTablero() {
        for (let x = 0; x < this.n; x++) {
            for (let y = 0; y < this.n; y++) {
                let pos = `${x},${y}`;
                this.listaAdyacencia.set(pos, new Node(pos));
            }
        }
    }

    generarTodasAristas(){
        this.listaAdyacencia.forEach((nodo, pos) => {
            let [x, y] = pos.split(',').map(Number);
    
            this.generarSegunCaballo(x, y);
        });
    }

    generarSegunCaballo(x, y) {
        let pos = `${x},${y}`;
        let nodoActual = this.listaAdyacencia.get(pos);
        
        nodoActual.clearAdyacentes();

        for (let [dx, dy] of this.movimientosCaballo) {
            let nx = x + dx, ny = y + dy;
            let nuevaPos = `${nx},${ny}`;

            if (this.listaAdyacencia.has(nuevaPos)) {
                let nodoDestino = this.listaAdyacencia.get(nuevaPos);
                nodoActual.addAdyacentes(nodoDestino);
            }
        }
    }

    colocarCaballo(x, y) {
        let pos = `${x},${y}`;
        if (!this.listaAdyacencia.has(pos)) {
            console.log("Posición inválida");
            return [];
        }
        this.caballoPos = pos;
        console.log(`Caballo colocado en (${x},${y})`);
        return this.obtenerMovimientosCaballo(x, y);
    }

    obtenerMovimientosCaballo(x, y) {
        let pos = `${x},${y}`;
        let nodoActual = this.listaAdyacencia.get(pos);
        return nodoActual.getAdyacentes().map(n => n.label);
    }

    mostrarGrafo() {
        for (let [pos, nodo] of this.listaAdyacencia) {
            console.log(`${pos} -> ${nodo.getAdyacentes().map(n => n.label).join(', ')}`);
        }
    }

    toJSON() {
        const grafoJson = {};
        this.listaAdyacencia.forEach((nodo, key) => {
            grafoJson[key] = nodo.getAdyacentes().map(n => n.label);
        });
        return grafoJson;
    }
}

export default Grafo;
