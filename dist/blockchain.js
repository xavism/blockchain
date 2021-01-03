"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("./transaction");
const block_1 = require("./block");
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        // Transactions pending  to be mined
        this.pendingTransactions = [];
        // the reward that will be given to the miners
        this.miningReward = 100;
    }
    // Every blockchain needs a genesis block, it is the first block of the blockchain
    createGenesisBlock() {
        return new block_1.default([]);
    }
    // Get the latest block of the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    // We mine Pending transactions to add it to the chain
    minePendingTransactions(miningRewardAddress) {
        // Adding the miner Tx to the pending ones to get the reward
        const rewardTX = new transaction_1.default(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTX);
        // Creating a block containing the pending transactions
        let block = new block_1.default(this.pendingTransactions, this.getLatestBlock().getHash());
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);
        // Cleaning the transactions that have been added to the chain
        this.pendingTransactions = [];
    }
    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress)
            throw new Error('Transaction must include from and to address');
        if (!transaction.isValid())
            throw new Error('Cannot add invalid transaction to chain');
        this.pendingTransactions.push(transaction);
    }
    // To check the total amount of an address, all the chain has to be checked
    getBalanceOfAddress(address) {
        let balance = 0;
        // Looping all blocks
        for (const block of this.chain) {
            // Looping all transactions inside a block
            for (const tx of block.getTransactions()) {
                // If you are the sender, the total amount have to decrease
                if (tx.fromAddress === address)
                    balance -= tx.amount;
                // If you are the receiver, the total amount have to increase
                if (tx.toAddress === address)
                    balance += tx.amount;
            }
        }
        return balance;
    }
    // Chacks if the chain is valid
    isChainValid() {
        // Analyzes each block (the genesis shouldn't be analyzed) comparing the store information of the previous block with the current information of the previousblock, recalculating the hash
        return this.chain.every((block, index) => {
            // first block is not evaluated
            if (index === 0)
                return true;
            // ensure all transactions are signed correctly
            if (!block.hasValidTransactions())
                return false;
            // ensure that the hash info of the current block is ok and hasn't been modified
            if (block.getHash() !== block.calculateHash())
                return false;
            // checking that the prevous block information is ok
            if (block.getPreviousHash() !== this.chain[index - 1].calculateHash())
                return false;
            return true;
        });
    }
}
exports.default = Blockchain;
//# sourceMappingURL=blockchain.js.map