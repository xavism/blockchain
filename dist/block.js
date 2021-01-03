"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
class Block {
    // All the info need to create a block in our chain, in this step we change data with a transactions array per each block
    constructor(transactions, previousHash) {
        this.nonce = 0;
        this.timestamp = new Date();
        this.transactions = transactions;
        if (previousHash)
            this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    // Method that calculates the hash of the block
    calculateHash() {
        return crypto_js_1.SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString();
    }
    // Getting the hash with the amount of 0 based on the difficulty
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`BLOCK MINED: ${this.hash} 💰`);
    }
    hasValidTransactions() {
        return this.transactions.every(tx => tx.isValid());
    }
    // GETTERS
    getHash() {
        return this.hash;
    }
    getTransactions() {
        return this.transactions;
    }
    getPreviousHash() {
        return this.previousHash;
    }
}
exports.default = Block;
//# sourceMappingURL=block.js.map