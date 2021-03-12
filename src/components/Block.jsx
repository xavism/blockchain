import { useDispatch } from "react-redux"
import { updateBlock } from "../redux/blockchain/actions"
import { SHA256 } from 'crypto-js'
import Transactions from './Transactions'
import ColorHelper from "../helpers/color.helper"
const Block = ({ index, block }) => {
  const { hash, nonce, previousHash, timestamp, transactions} = block
  const dispatch = useDispatch()
  // handlers
  const handleInput = (property, {target: { value }}, isNumber = false) => {
    let newBlock = {
      ...block,
      [property]: !isNumber ? value : parseFloat(value),
    }
    dispatch(updateBlock(
      index,
      {
        ...newBlock,
        hash: SHA256(newBlock.timestamp + JSON.stringify(newBlock.transactions) + newBlock.previousHash + newBlock.nonce).toString()
      }))
  }

  const parsedHash = () => hash.substring(0,10)
  //renders
  const renderBlock = () => {
    return (
      <div>
        <div className="flex mb-2 rounded">
          <p className="max-w-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="mr-2 font-bold">Hash: </span>
            <span className="rounded px-2 text-white" style={{backgroundColor: ColorHelper.intToRGB(hash)}} >{parsedHash()}...</span>
          </p>
        </div>
        <div className="flex mb-2">
          <label className="mr-2 font-bold" htmlFor="nonce">Nonce</label>
          <input className="flex-1 pl-2" value={nonce} onChange={(e) => handleInput('nonce', e, true)} type="number" min="0"/>
        </div>
        { previousHash ?
        <div className="flex mb-2 items-center">
          <label className="font-bold" htmlFor="previousHash">Previous hash</label>
          <div style={{backgroundColor: ColorHelper.intToRGB(previousHash)}} className="mx-2 w-5 h-5 rounded"></div>
          <input className="flex-1 pl-2" value={previousHash} onChange={(e) => handleInput('previousHash', e)} type="text"/>
        </div>
        : null
        }
        <div className="flex">
          <label className="mr-2 font-bold" htmlFor="hash">Timestamp</label>
          <input className="flex-1 pl-2" value={ timestamp } onChange={(e) => handleInput('timestamp', e)} type="date"/>
        </div>
        {transactions.length ? 
          <div>
          <p className="font-bold">Transactions:</p>
          <Transactions transactions={transactions} />
        </div>
        : null
        }
      </div>
    )
  }


  return (
    <div className="flex">
      <div style={{borderColor: ColorHelper.intToRGB(hash)}} className="border-l-8 w-10 rounded bg-gray-200 shadow px-2 py-4 mr-4">
        <p className="font-bold ml-5 uppercase transform origin-top-left rotate-90 absolute">{index === 0 ? 'Genesis Block' : `Block ${index}`}</p>
      </div>
      <div className="rounded bg-gray-100 shadow px-2 py-4 flex-1">
        { renderBlock() }
      </div>
    </div>
  )
}
export default Block