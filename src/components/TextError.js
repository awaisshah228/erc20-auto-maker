import React from 'react'

function TextError (props) {
  return <div className='error text-red-300'>{props.children}</div>
}

export default TextError