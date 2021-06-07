import { Box, Select } from 'components'
import { FormGroup, InputGroup, RadioGroup, Radio, Button } from '@blueprintjs/core'
import React from 'react'

const Bio = ({nextPage}) => {
  return (
    <Box>
      <FormGroup labelFor="nama" label="Nama Lengkap">
        <InputGroup id="nama" placeholder="Nama lengkap" />
      </FormGroup>
      <FormGroup labelFor="jenisKelamin" label="Jenis Kelamin">
        <RadioGroup inline>
          <Radio label="Laki - laki" value="Laki - laki" />
          <Radio label="Perempuan" value="Perempuan" />
        </RadioGroup>
      </FormGroup>
      <FormGroup labelFor="propinsi" label="Propinsi Tempat Lahir">
        <Select fill={true} id="propinsi" label="Pilih propinsi tempat lahir" options={[
          { label: 'Sulawesi Utara', value: 0 },
          { label: 'Sulawesi Selatan', value: 1 },
        ]} />
      </FormGroup>
      <FormGroup labelFor="kota" label="Kota/Kabupaten Tempat Lahir">
        <Select fill id="kota" label="Pilih kota/kabupaten tempat lahir" options={[
          { label: 'Manado', value: 0 },
          { label: 'Minahasa', value: 1 },
        ]} />
      </FormGroup>
      <FormGroup labelFor="tanggalLahir" label="Tanggal Lahir">
        <InputGroup type="date" />
      </FormGroup>
      <FormGroup labelFor="golonganDarah" label="Golongan Darah">
        <Select fill id="golonganDarah" label="Pilih golongan darah" options={[
          { label: 'A', value: 0 },
          { label: 'B', value: 1 },
          { label: 'O', value: 2 },
          { label: 'AB', value: 3 },
        ]} />
      </FormGroup>
      <FormGroup labelFor="tempatLahir" label="Tempat Lahir">
        <InputGroup id="tempatLahir" placeholder="Tempat Lahir" />
      </FormGroup>
      <FormGroup labelFor="kondisiButaWarna" label="Kondisi Buta Warna">
        <RadioGroup inline>
          <Radio label="Ya" value="Ya" />
          <Radio label="Tidak" value="Tidak" />
        </RadioGroup>
      </FormGroup>
      <FormGroup labelFor="kacamata" label="Memakai Kacamata">
        <RadioGroup inline>
          <Radio label="Ya" value="Ya" />
          <Radio label="Tidak" value="Tidak" />
        </RadioGroup>
      </FormGroup>
      <FormGroup labelFor="gigi" label="Kondisi Gigi">
        <RadioGroup inline>
          <Radio label="Lengkap" value="Lengkap" />
          <Radio label="Tidak Lengkap" value="Tidak Lengkap" />
        </RadioGroup>
      </FormGroup>
      <FormGroup>
        <Button onClick={nextPage} outlined text="Selanjutnya"></Button>
      </FormGroup>
    </Box>
  )
}

export default Bio
