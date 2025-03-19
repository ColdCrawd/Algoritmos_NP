class Pila {
    constructor() {
        this.pila = [];
        this.raiz = 0;
    }

    push(valor) {
        this.pila[this.top] = valor;
        this.top++;
    }

    pop() {
        if (!this.isEmpty()) {
            this.raiz--;
            let temp = this.pila[this.raiz];
            const item = this.pila[this.raiz];
            delete this.pila[this.raiz];
            return temp;
        }
        return undefined;
    }

    size() {
        return this.raiz;
    }

    isEmpty() {
        return this.raiz === 0;
    }
}

export default Pila;