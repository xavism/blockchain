import { useDispatch, useSelector } from "react-redux"
import { updateBlock } from "../redux/blockchain/actions"
import EditableTransactions from './EditableTransactions'
import ValidationTag from './ValidationTag'
import ColorHelper from "../helpers/color.helper"
import BlockHelper from "../helpers/block.helper"
import { useCallback } from "react"
const Block = ({ index, block }) => {
  const { chain } = useSelector(state => state.blockchain)
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
        //hash: BlockHelper.calculateHash(newBlock.timestamp, newBlock.transactions, newBlock.previousHash, newBlock.nonce)
      }))
  }

  const parsedHash = useCallback(() => BlockHelper.calculateHash(timestamp, transactions, previousHash, nonce), [timestamp, transactions, previousHash, nonce])
  const blockColor = () => ColorHelper.intToRGB(parsedHash())
  //renders
  const renderBlock = () => {
    return (
      <div>
        <div className="flex mb-2 rounded justify-between">
          <p className="max-w-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="mr-2 font-bold">Current Hash: </span>
            <span className="rounded px-2 text-white" style={{backgroundColor: blockColor()}} >{parsedHash().substring(0,10)}...</span>
          </p>
          <div>
            <ValidationTag valid={BlockHelper.isValid(block, chain, index)} />
          </div>
        </div>
        <div className="flex mb-2">
          <label className="mr-2 font-bold" htmlFor="nonce">Hash</label>
          <input className="flex-1 pl-2" value={hash} onChange={(e) => handleInput('hash', e)} type="text"/>
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
          <EditableTransactions transactions={transactions} blockIndex={index}/>
        </div>
        : null
        }
      </div>
    )
  }


  return (
    <div className="flex">
      <div style={{borderColor: blockColor()}} className={`border-l-8 w-10 rounded shadow px-2 py-4 mr-4 ${BlockHelper.isValid(block, chain, index) ? 'bg-gray-200' : 'bg-red-500 text-white'}`}>
        <p className="font-bold ml-5 uppercase transform origin-top-left rotate-90 absolute">{index === 0 ? 'Genesis Block' : `Block ${index}`}</p>
      </div>
      <div className="rounded bg-gray-100 shadow px-2 py-4 flex-1">
        { renderBlock() }
      </div>
    </div>
  )
}
export default Block