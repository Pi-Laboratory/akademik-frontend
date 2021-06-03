import { Button, FormGroup, InputGroup, MenuItem } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import { Box } from 'components'
import React from 'react'
import { programs } from './Students';

const ProgramSelect = Select.ofType();
const currentYear = new Date().getFullYear();
const generationArray = Array(10).fill(10).map((val, i) => (i));

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
      <FormGroup label="Program Studi" labelFor="prodi">
        <ProgramSelect items={programs} itemRenderer={program => (
          <MenuItem
            text={program.title}
            key={program.id}
          />
        )}>
          <Button rightIcon="caret-down" text="Pilih Prodi" />
        </ProgramSelect>
      </FormGroup>
      <FormGroup label="Angkatan" labelFor="angkatan">
        <ProgramSelect items={generationArray} itemRenderer={(i) => (
          <MenuItem
            text={`${currentYear - (i + 1)}/${currentYear - (i)}`}
            key={i}
          />
        )}>
          <Button rightIcon="caret-down" id="angkatan" text="Pilih Angkatan" />
        </ProgramSelect>
      </FormGroup>
      <FormGroup label="Kelas" labelFor="kelas">
        <ProgramSelect items={generationArray} itemRenderer={(i) => (
          <MenuItem
            text={`A - ${i + 1}`}
            key={i}
          />
        )}>
          <Button id="kelas" rightIcon="caret-down" text="Pilih Angkatan" />
        </ProgramSelect>
      </FormGroup>
      <FormGroup>
        <Button onClick={onSearch} icon="search"></Button>
      </FormGroup>
    </Box>
  )
}

export default AdvancedSearch
