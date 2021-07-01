import React from 'react'

const TextInput = ({value, onChange, name, placeholder, defaultValue}) => {
  return (
    <input className="bp3-input" placeholder={placeholder} defaultValue={defaultValue} value={value} onChange={onChange} name={name} />
  )
}

export default TextInput
