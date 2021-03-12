import { useDispatch } from "react-redux"
import { updateBlock } from "../redux/blockchain/actions"
import { SHA256 } from 'crypto-js'
import Transactions from './Transactions'
const Block = ({ index, block }) => {
  const { hash, nonce, previousHash, timestamp, transactions} = block
  const dispatch = useDispatch()
  // handlers
  const handleInput = (property, {target: { value }}, isNumber = false) => {
    dispatch(updateBlock(
      index,
      {
      ...block,
      [property]: !isNumber ? value : parseFloat(value),
      hash: SHA256(timestamp + JSON.stringify(transactions) + previousHash + nonce).toString()
    }))
  }
  //renders
  const renderBlock = () => {
    return (
      <div className="">
        <div className="flex mb-2">
          <p><span className="mr-2 font-bold">Hash: </span>{hash}</p>
        </div>
        <div className="flex mb-2">
          <label className="mr-2 font-bold" htmlFor="nonce">Nonce</label>
          <input className="flex-1 pl-2" value={nonce} onChange={(e) => handleInput('nonce', e, true)} type="number" min="0"/>
        </div>
        <div className="flex mb-2">
          <label className="mr-2 font-bold" htmlFor="previousHash">Previous hash</label>
          <input className="flex-1 pl-2" value={previousHash} onChange={(e) => handleInput('previousHash', e)} type="text"/>
        </div>
        <div className="flex">
          <label className="mr-2 font-bold" htmlFor="hash">Timestamp</label>
          <input className="flex-1 pl-2" value={ timestamp } onChange={(e) => handleInput('timestamp', e)} type="date"/>
        </div>
        <div>
          <p>Transactions:</p>
          <Transactions transactions={transactions} />
        </div>
      </div>
    )
  }


  return (
    <div className="flex">
      <div className="w-10 rounded bg-gray-200 shadow px-2 py-4 mr-4">
        <p className="font-bold ml-6 uppercase transform origin-top-left rotate-90 absolute">{index === 0 ? 'Genesis Block' : `Block ${index}`}</p>
      </div>
      <div className="rounded bg-gray-100 shadow px-2 py-4 flex-1">
        { renderBlock() }
      </div>
    </div>
  )
}
export default Block