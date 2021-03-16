import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ChainHelper from './../helpers/chain.helper'
import WorkerContext from './../contexts/mine.worker'
import { mine } from "../redux/blockchain/actions"
import Transactions from './Transactions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const PendingTX = () => {
  const dispatch = useDispatch()
  const { pendingTransactions, chain, miningReward, difficulty } = useSelector(state => state.blockchain)
  const { wallets } = useSelector(state => state.wallets)
  const [opened, setOpened] = useState(false)
  const [miner, setMiner] = useState('')
  const [mineLoading, setMineLoading] = useState(false) 
  const worker = useContext(WorkerContext)

  //handlers
  const stop = (e) => {
    e.stopPropagation()
  }
  const handleMine = (e) => {
    setMineLoading(true)
    const minerWallet = wallets.find(wallet => wallet.publicKey === miner)
    worker.postMessage({ pendingTx: pendingTransactions, miner: minerWallet, miningReward, difficulty, latestBlockHash: ChainHelper.getLatestBlock(chain).hash });
    worker.onmessage = async (e) => {
      console.log('reached data', e.data)
      await dispatch(mine(e.data))
      setMineLoading(false)
    }
    setMiner('')
    stop(e)
  }
  const handleSelectMiner = ({ target: { value }}) => setMiner(value)

  // renders
  const renderMiner = () => {
    return mineLoading ? 
    (<div className="mr-4">Mining <FontAwesomeIcon spin icon={faSpinner} /></div>)
    :
    (<div>
      <label className="mr-2" htmlFor="miner">Miner:</label>
      <select className="w-48 py-1" value={miner} onChange={handleSelectMiner} onClick={stop} name="miner" id="miner">
        <option value="">Select an addr</option>
        { wallets.map(({ publicKey, name }) => (<option key={publicKey} value={publicKey}>{name}</option>))}
      </select>
      <button disabled={miner === ''} onClick={handleMine} className="py-1 px-2 mx-2 rounded text-white bg-gray-500 hover:bg-gray-600 disavled:hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed">Mine ⛏️</button>
    </div>)
  }

  const renderNumber = () => {
    return <span className="flex justify-center items-center w-5 h-5 rounded-full text-white bg-red-500">{pendingTransactions.length}</span>
  }

  const renderTitle = () => {
    return !pendingTransactions.length ?
      <h2 className="font-bold px-2 py-3">No Pending Transactions</h2> :
      (<div className="px-2 py-2 md:flex items-center cursor-pointer hover:bg-gray-200 justify-between rounded-t" onClick={() => setOpened(!opened)}>
          <h2 className="font-bold flex-1 flex mb-4 md:mb-0">
            <p className="font-bold text-center w-5">{opened ? '-' : '+'}</p>
            <p>Pending Transactions: </p>
            <p className="md:hidden flex-1 flex justify-end">{ renderNumber() }</p>
          </h2>
          <div className="flex">{ renderMiner() }</div>
          <div className="hidden md:block">{ renderNumber() }</div>
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