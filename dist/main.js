"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./blockchain");
const transaction_1 = require("./transaction");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const myKey = ec.keyFromPrivate('4920dd825c58d65b8c72c6655c0e3de8841f7c3d42590f147b71f0cb8dcaa701');
const myWalletAddress = myKey.getPublic('hex');
let xaviCoin = new blockchain_1.default();
console.log('Is chain Valid?', xaviCoin.isChainValid());
const tx1 = new transaction_1.default(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
xaviCoin.addTransaction(tx1);
console.log('\nStarting the miner.⛏️..');
xaviCoin.minePendingTransactions(myWalletAddress);
console.log(`\nBalance of ${myWalletAddress} (the miner⛏️) is ${xaviCoin.getBalanceOfAddress(myWalletAddress)}`);
console.log('Is chain Valid?', xaviCoin.isChainValid());
//# sourceMappingURL=main.js.map