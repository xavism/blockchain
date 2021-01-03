"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elliptic_1 = require("elliptic");
const EC = new elliptic_1.ec('secp256k1');
const key = EC.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');
console.log();
console.log('Private key', privateKey);
console.log();
console.log('Public key', publicKey);
//# sourceMappingURL=keyGenerator.js.map