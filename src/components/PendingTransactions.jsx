import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ChainHelper from './../helpers/chain.helper'
//import WorkerContext from './../contexts/mine.worker'
import { mine } from "../redux/blockchain/actions"
import Transactions from './Transactions'
const PendingTX = () => {
  const dispatch = useDispatch()
  const { pendingTransactions, chain, miningReward, difficulty } = useSelector(state => state.blockchain)
  const { wallets } = useSelector(state => state.wallets)
  const [opened, setOpened] = useState(false)
  const [miner, setMiner] = useState('')
  //const worker = useContext(WorkerContext)

  //handlers
  const stop = (e) => {
    e.stopPropagation()
  }
  const handleMine = (e) => {
    // debugger
    // const minerWorker = new Worker()
    const minerWallet = wallets.find(wallet => wallet.publicKey === miner)
    // NEEDS A WORKER!!
    let block = ChainHelper.mine(ChainHelper.getLatestBlock(chain).hash, pendingTransactions, miningReward, difficulty, minerWallet)
    dispatch(mine(block))
    //worker.postMessage({ pendingTx: pendingTransactions, minerAddress: miner, miningReward, difficulty, latestBlockHash: ChainHelper.getLatestBlock(chain).hash });

    // worker.onmessage = (e) => {
    //   console.log('reached data')
    //   dispatch(mine(e.data));
    // }
    stop(e)
  }
  const handleSelectMiner = ({ target: { value }}) => setMiner(value)

  // renders
  const renderMiner = () => {
    return (<div>
      <label className="mr-2" htmlFor="miner">Miner:</label>
      <select className="w-48" value={miner} onChange={handleSelectMiner} onClick={stop} name="miner" id="miner">
        <option value="">Select an addr</option>
        { wallets.map(({ publicKey, name }) => (<option key={publicKey} value={publicKey}>{name}</option>))}
      </select>
      <button disabled={miner === ''} onClick={handleMine} className="py-1 px-2 mx-2 rounded text-white bg-gray-500 hover:bg-gray-600">Mine ⛏️</button>
    </div>)
  }

  const renderTitle = () => {
    return !pendingTransactions.length ?
      <h2 className="font-bold px-2 py-3">No Pending Transactions</h2> :
      (<div className=" px-2 py-2 flex items-center cursor-pointer hover:bg-gray-200 justify-between rounded-t" onClick={() => setOpened(!opened)}>
          <h2 className="font-bold flex-1 flex"><p className="font-bold text-center w-5">{opened ? '-' : '+'}</p>Pending Transactions: </h2>
          <div>{ renderMiner() }</div>
          <span className="ml-5 flex justify-center items-center w-5 h-5 rounded-full text-white bg-red-500">{pendingTransactions.length}</span>
        </div>
      )
  }
  
  const renderTransactions = () => {
    if (!opened) return
    return <Transactions transactions={pendingTransactions} />
  }

  return (
    <div className="rounded bg-gray-100 shadow">
      { renderTitle() }
      { renderTransactions() }
    </div>
  )
}

export default PendingTX