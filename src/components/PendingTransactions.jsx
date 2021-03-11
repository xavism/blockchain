import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import WorkerContext from './../contexts/mine.worker'
import { mine } from "../redux/blockchain/actions"
import Wallet from "./Wallet"
import ChainHelper from "../helpers/chain.helper"

const PendingTX = () => {
  const dispatch = useDispatch()
  const { pendingTransactions, chain, miningReward, difficulty } = useSelector(state => state.blockchain)
  const { wallets } = useSelector(state => state.wallets)
  const [opened, setOpened] = useState(false)
  const [miner, setMiner] = useState('')
  const worker = useContext(WorkerContext)

  // getter
  const getWalletByAddr = (addr) => wallets.find(wallet => wallet.publicKey === addr)

  //handlers
  const stop = (e) => {
    e.stopPropagation()
  }
  const handleMine = (e) => {
    console.log(pendingTransactions)
    worker.postMessage({ pendingTx: pendingTransactions, minerAddress: miner, miningReward, difficulty, latestBlockHash: ChainHelper.getLatestBlock(chain).hash });
    console.log('Message posted to worker');

    worker.onmessage = (e) => {
      dispatch(mine(e.data));
    }
    stop(e)
  }
  const handleSelectMiner = ({ target: { value }}) => setMiner(value)

  // renders
  const renderMiner = () => {
    return (<div>
      <label className="mr-2" htmlFor="miner">Miner:</label>
      <select value={miner} onChange={handleSelectMiner} onClick={stop} name="miner" id="miner">
        <option value="">Select an addr</option>
        { wallets.map(({ publicKey, name }) => (<option key={publicKey} value={publicKey}>{name}</option>))}
      </select>
      <button disabled={miner === ''} onClick={handleMine} className="py-1 px-2 mx-2 rounded text-white bg-gray-500 hover:bg-gray-600">Mine ⛏️</button>
    </div>)
  }

  const renderTitle = () => {
    return !pendingTransactions.length ?
      <h2 className="font-bold px-2 py-2">No Pending Transactions</h2> :
      (<div className=" px-2 py-2 flex items-center cursor-pointer hover:bg-gray-200 justify-between rounded-t" onClick={() => setOpened(!opened)}>
          <h2 className="font-bold flex-1">Pending Transactions: </h2>
          <div>{ renderMiner() }</div>
          <span className="ml-5 flex justify-center items-center w-5 h-5 rounded-full text-white bg-red-500">{pendingTransactions.length}</span>
        </div>
      )
  }
  
  const renderTransactions = () => {
    if (!opened) return
    return (
      <div className="px-2 py-2">
        { pendingTransactions.map(tx => {
          const from = getWalletByAddr(tx.fromAddress.publicKey)
          const to = getWalletByAddr(tx.toAddress.publicKey)
          return (<div className="flex items-center my-1" key={tx.id}>
            <Wallet wallet={from} />
            <div className="mx-2">sends { tx.amount } to </div>
            <Wallet wallet={to} />
          </div>)
        }) }
      </div>)
  }

  return (
    <div className="rounded bg-gray-100 shadow">
      { renderTitle() }
      { renderTransactions() }
    </div>
  )
}

export default PendingTX