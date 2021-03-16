onmessage = async (e) => {
  const data = e.data
  let block = await mine(data.latestBlockHash, data.pendingTx, data.miningReward, data.difficulty, data.miner)
  postMessage(block);
}

const mine = async (latestBlockHash, pendingTx, miningReward, difficulty, miner) => {
  // Adding the miner Tx to the pending ones to get the reward
  const rewardTX = createTx(null, miner, miningReward)
  pendingTx.push(rewardTX)
  // Creating a block containing the pending transactions
  const block = await createBlock(new Date().toISOString().split('T')[0], pendingTx, latestBlockHash)
  await mineBlock(block, difficulty)
  return block
}

const createTx = (from, to, amount) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    fromAddress: from,
    toAddress: to,
    amount,
    signature: ''
  }
}

const createBlock = async (timestamp, transactions, previousHash = '') => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp,
    transactions,
    previousHash,
    nonce: 0,
    hash: await calculateHash(timestamp, transactions, previousHash, 0)
  }
}

const mineBlock = async (block, difficulty) => {
  let { timestamp, transactions, previousHash } = block
  while (block.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
    if (block.nonce % 10000 === 0) console.log(block.nonce)
    block.nonce++
    block.hash = await calculateHash(timestamp, transactions, previousHash, block.nonce)
  }
}

const calculateHash = async (timestamp, transactions, previousHash, nonce) => {
  return await sha256(timestamp + JSON.stringify(transactions) + previousHash + nonce)
} 

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder('utf-8').encode(message);
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}