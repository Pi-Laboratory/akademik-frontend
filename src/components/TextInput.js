import React from 'react'

const TextInput = ({value, onChange, name, placeholder}) => {
  return (
    <input className="bp3-input" placeholder={placeholder} value={value} onChange={onChange} name={name} />
  )
}

export default TextInput
