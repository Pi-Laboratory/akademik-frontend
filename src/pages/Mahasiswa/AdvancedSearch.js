import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import { Box } from 'components'
import React from 'react'

const AdvancedSearch = ({ onSwitchMode, onSearch }) => {
  return (
    <Box>
      <Button text="Pencarian Sederhana" onClick={() => onSwitchMode('simple')} />
      <FormGroup label="Nama" labelFor="name">
        <InputGroup id="name" placeholder="Nama Lengkap" />
      </FormGroup>
      <FormGroup label="NIM" labelFor="NIM">
        <InputGroup id="NIM" placeholder="NIM" type="number" />
      </FormGroup>
      <FormGroup>
        <Button onClick={onSearch} icon="search"></Button>
      </FormGroup>
    </Box>
  )
}

export default AdvancedSearch
