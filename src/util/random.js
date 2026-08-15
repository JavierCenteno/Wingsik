export class Random {
    constructor(a, b, c, d) {
        this.a = (a !== undefined ? a : (Math.random() * 0x1_0000_0000)) | 0;
        this.b = (b !== undefined ? b : (Math.random() * 0x1_0000_0000)) | 0;
        this.c = (c !== undefined ? c : (Math.random() * 0x1_0000_0000)) | 0;
        this.d = (d !== undefined ? d : (Math.random() * 0x1_0000_0000)) | 0;
        this.seed = [this.a, this.b, this.c, this.d];
    }

    /**
     * Generates an integer in the [0, 2 ** 32) range.
     */
    generateInteger() {
        const t = (((this.a + this.b) | 0) + this.d) | 0;
        this.d = (this.d + 1) | 0;
        this.a = this.b ^ (this.b >>> 9);
        this.b = (this.c + (this.c << 3)) | 0;
        this.c = ((this.c << 21) | (this.c >>> 11));
        this.c = (this.c + t) | 0;
        return t + 0x8000_0000;
    }

    /**
     * Generates a number in the [0, 1) range.
     */
    generateNumber() {
        return (this.generateInteger()) / 0x1_0000_0000;
    }

    /**
     * Generates a boolean with a given probability (in the [0, 1] range) of being true. 
     */
    generateBoolean(probability = 0.5) {
        return this.generateNumber() < probability;
    }
}