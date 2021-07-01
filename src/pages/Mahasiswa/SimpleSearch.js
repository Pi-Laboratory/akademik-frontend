import { Flex } from 'components'
import React from 'react'
import { Select } from '@blueprintjs/select'
import { Button, ControlGroup, Divider, MenuItem, HTMLSelect } from '@blueprintjs/core'
import TextInput from 'components/TextInput';
import { programs } from './Students';
import queryString from 'query-string';
import { useLocation } from 'react-router';

const StudentSelect = Select.ofType();

export const SimpleSearch = ({ onSwitchMode, onSearch }) => {
  const [category, setCategory] = React.useState(null);
  const {search} = useLocation();
  const {angkatan} = queryString.parse(search);
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
        <TextInput defaultValue={angkatan} placeholder={category === null ? "Kategori" : `Cari Berdasarkan ${category}`} />
        <HTMLSelect defaultValue={typeof angkatan === 'undefined' ? undefined : 'Angkatan'} placeholder="Pilih Kategori" value={category} onChange={ev => setCategory(ev.target.value)} options={['NIM', 'Nama', 'Angkatan', 'Kelas']} />
      </ControlGroup>
      <Divider />
      <Button onClick={onSearch} icon="search"></Button>
      <Divider />
      <Button onClick={() => onSwitchMode('advanced')} text="Pencarian Lanjutan" />
    </Flex>
  )
}
