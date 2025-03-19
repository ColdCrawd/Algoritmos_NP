import Node from "./node";

class Grafo {
    constructor() {
        this.listaAdyacnencia = new Map();
    }

    addNode(node){
        if(!this.listaAdyacnencia.has(node)){
            this.listaAdyacnencia.set(node, new Node(node)); //para mi: setea la key (Como lo llamamos internamente) y el valor que tiene
        }
    }

    addAristas(node1, node2){
        this.addNode(node1);
        this.addNode(node2);

        const value1 = this.listaAdyacnencia.get(node1);
        const value2 = this.listaAdyacnencia.get(node2);

        value1.addAdyacentes(value2);
        value2.addAdyacentes(value1);
    }

    deleteAristas(node1, node2){
        this.addNode(node1);
        this.addNode(node2);

        const value1 = this.listaAdyacnencia.get(node1);
        const value2 = this.listaAdyacnencia.get(node2);

        value1.deleteAdyacente(value2);
        value2.deleteAdyacente(value1);
    }    

    mostrarGrafo() {
        for (let [valor, nodo] of this.listaAdyacnencia) {
          console.log(`${valor} -> ${nodo.getAdyacentes().map(n => n.label).join(', ')}`);
        }
    }

}

export default Grafo;