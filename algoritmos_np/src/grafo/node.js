
class Node {
    constructor(label){
        this.label = label;
        this.adyacentes = new Set();
    }

    addAdyacentes(node) {
        if (!this.adyacentes.has(node)){
            this.adyacentes.add(node);
        }
    }

    getAdyacentes() {
        return Array.from(this.adyacentes);
    }

    deleteAdyacente(node){
        if (this.adyacentes.has(node)){
            this.adyacentes.delete(node);
        }
    }

}

export default Node;