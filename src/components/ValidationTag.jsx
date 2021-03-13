const ValidationTag = ({valid}) => {
  return (
    <div className="text-white font-bold">
      { valid ? <div className="bg-green-500 px-2 rounded">VALID</div> : <div className="bg-red-500 px-2 rounded">INVALID</div>}
    </div>
  )
}

export default ValidationTag