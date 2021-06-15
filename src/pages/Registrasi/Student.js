import { Box, Select } from 'components'
import React, { useState, useCallback } from 'react'
import { FormGroup, InputGroup, RadioGroup, Radio, Button, ButtonGroup } from '@blueprintjs/core'

const Student = ({ nextPage }) => {
  const [majors, setMajors] = useState([]);

  const appendMajors = useCallback((selection) => {
    if (!majors.find(major => selection.value === major.value) && majors.length < 3) {
      setMajors(majors => [...majors, selection]);
    }
  }, [majors]);

  const removeMajor = useCallback((selection, i) => {
    majors.splice(i, 1);
    setMajors([...majors]);
  }, [majors]);

  return (
    <Box>
      <FormGroup labelFor="major" label="Jurusan">
        <Select id="major"
          onChange={appendMajors}
          value={majors}
          removeItem={removeMajor}
          multiple={true} optionRenderer={item => item.label} fill={true} label="Jurusan" options={Array.apply(null, { length: 10 }).fill(10).map((x, i) =>
            ({ label: `Jurusan - ${i + 1}`, value: (i + 1) }))} />
      </FormGroup>
      <FormGroup labelFor="prodi" label="Program Studi">
        <Select label="Program Studi" options={Array.apply(null, { length: 10 }).fill(10).map((x, i) =>
          ({ label: `Program Studi - ${i + 1}`, value: (i + 1) }))} />
      </FormGroup>
      <FormGroup label="Periode Masuk" labelFor="periode" >
        <ButtonGroup>
          <Select label="Pilih periode" options={[
            { label: 'Ganjil', value: 'Ganjil' },
            { label: 'Genap', value: 'Genap' },
          ]} />
          <Select id="periode" label="Pilih periode" options={Array.apply(null, { length: 10 }).fill(10).map((x, i) =>
            ({ label: `${2020 - (i)}/${2020 + (i + 1)}` }))} />
        </ButtonGroup>
      </FormGroup>
      <FormGroup label="Angkatan" labelFor="generation">
        <InputGroup placeholder="Angkatan" id="generation" />
      </FormGroup>
      <FormGroup label="No. Tes" labelFor="testnum">
        <InputGroup placeholder="No. Tes" id="testnum" />
      </FormGroup>
      <FormGroup label="Jalur masuk" labelFor="jalur">
        <Select id="jalur" label="Pilih periode" options={Array.apply(null, { length: 10 }).fill(10).map((x, i) =>
          ({ label: `Jalur masuk ${i + 1}` }))} />
      </FormGroup>
      <FormGroup label="Tanggal Daftar" labelFor="registerdate">
        <InputGroup type="date" placeholder="Tanggal Daftar" id="registerdate" />
      </FormGroup>
      <FormGroup label="Gelombang Pendaftaran" labelFor="wave">
        <Select id="wave" label="Pilih gelombang pendaftaran" options={Array.apply(null, { length: 5 }).fill(10).map((x, i) =>
          ({ label: `Gelombang ${i + 1}` }))} />
      </FormGroup>
      <FormGroup label="Status Mahasiswa">
        <RadioGroup>
          <Radio label="Calon Mahasiswa" value="Calon Mahasiswa" />
          <Radio label="Mahasiswa" value="Mahasiswa" />
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Button onClick={nextPage} text="Selanjutnya" />
      </FormGroup>
    </Box>
  )
}

export default Student
