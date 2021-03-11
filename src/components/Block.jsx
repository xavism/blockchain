import { useDispatch } from "react-redux"
import { updateBlock } from "../redux/blockchain/actions"

const Block = ({ index, block }) => {
  const { hash, nonce, previousHash, timestamp} = block
  const dispatch = useDispatch()
  // handlers
  const handleInput = ( property, {target: { value }}, isNumber = false) => {
    dispatch(updateBlock(
      index,
      {
      ...block,
      [property]: !isNumber ? value : parseFloat(value)
    }))
  }

  //renders
  const renderBlock = () => {
    return (
      <div className="">
        <div className="flex mb-2">
          <label className="mr-2 font-bold" htmlFor="hash">Hash</label>
          <input className="flex-1 pl-2 border border-blue-500 rounded-xl" value={hash} onChange={(e) => handleInput('hash', e)} type="text"/>
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
          <input className="flex-1 pl-2" value={timestamp} onChange={(e) => handleInput('timestamp', e)} type="text"/>
        </div>
      </div>
    )
  }


  return (
    <div className="rounded bg-gray-100 shadow px-2 py-4">
      { renderBlock() }
    </div>
  )
}
export default Block