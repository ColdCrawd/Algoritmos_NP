class Cola {
    constructor() {
        this.cola = [];
        this.raiz = 0;
        this.final = 0;
    }

    encolar(valor) {
        this.cola[this.final] = valor;
        this.final++;
    }

    desencolar() {
        if (!this.isEmpty()) {
            let temp = this.cola[this.raiz];
            delete this.cola[this.raiz];
            this.raiz++;
            return temp;
        }
        return undefined;
    }

    size() {
        return this.rear - this.front;
    }

    isEmpty() {
        return this.front === this.rear;
    }
}

export default Cola;