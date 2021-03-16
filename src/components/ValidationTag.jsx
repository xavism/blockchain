import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
const ValidationTag = ({valid}) => {
  return (
    <div className="text-white font-bold">
      { valid ?
        <div className="bg-green-500 px-2 rounded"><FontAwesomeIcon icon={faCheck} /> VALID</div>
        :
        <div className="bg-red-500 px-2 rounded"><FontAwesomeIcon icon={faTimes} /> INVALID</div>}
    </div>
  )
}

export default ValidationTag