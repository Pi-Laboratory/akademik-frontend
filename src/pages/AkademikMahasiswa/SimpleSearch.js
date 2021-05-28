import { Flex } from 'components'
import React from 'react'
import { Select } from '@blueprintjs/select'
import { Button, ControlGroup, Divider, MenuItem, HTMLSelect } from '@blueprintjs/core'
import TextInput from 'components/TextInput';
import { programs } from './Students';

const StudentSelect = Select.ofType();

export const SimpleSearch = ({ onSwitchMode }) => {
  const [category, setCategory] = React.useState(null);

  return (
    <Flex>
      <StudentSelect items={programs} itemRenderer={program =>
      (<MenuItem
        text={program.title}
        key={program.id}
      />)
      }>
        <Button text="Pilih Prodi" rightIcon="caret-down" />
      </StudentSelect>
      <Divider />
      <ControlGroup vertical={false}>
        <TextInput placeholder={category === null ? "Kategori" : `Cari Berdasarkan ${category}`} />
        <HTMLSelect placeholder="Pilih Kategori" value={category} onChange={ev => setCategory(ev.target.value)} options={['NIM', 'Nama', 'Angkatan', 'Kelas']} />
      </ControlGroup>
      <Divider />
      <Button icon="search"></Button>
      <Divider />
      <Button onClick={() => onSwitchMode('advanced')} text="Pencarian Lanjutan" />
    </Flex>
  )
}
