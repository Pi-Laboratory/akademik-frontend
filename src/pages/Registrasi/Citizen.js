import { Box, Select } from 'components'
import React from 'react'
import { FormGroup, InputGroup, Button, TextArea } from '@blueprintjs/core'

const religions = ['Kristen', 'Katolik', 'Islam', 'Hindu', 'Buddha', 'Konghucu', 'Lainnya'];
const maritalStatus = ['Belum Menikah', 'Sudah Menikah', 'Janda', 'Duda'];
const citizenship = ['WNI', 'WNA', 'Tidak Ada WN'];
const houseStatus = ['Rumah orang tua', 'Rumah saudara', 'Asrama', 'Pondokan', 'Rumah sendiri', 'Lain-lain'];

const Citizen = ({ nextPage }) => {
  return (
    <Box>
      <FormGroup label="NIK" labelFor="nik">
        <InputGroup id="nik" placeholder="NIK" />
      </FormGroup>
      <FormGroup label="Agama" labelFor="religi">
        <Select id="religi" label="Pilih agama" options={religions.map((rel, idx) => ({ label: rel, value: idx }))} />
      </FormGroup>
      <FormGroup label="Status Nikah" labelFor="maritalstatus">
        <Select id="maritalstatus" label="Pilih agama" options={maritalStatus.map((rel, idx) => ({ label: rel, value: idx }))} />
      </FormGroup>
      <FormGroup label="Kewarganegaraan" labelFor="citizenship">
        <Select id="citizenship" label="Pilih agama" options={citizenship.map((rel, idx) => ({ label: rel, value: idx }))} />
      </FormGroup>
      <FormGroup label="Kewarganegaraan" labelFor="houseStatus">
        <Select id="houseStatus" label="Pilih agama" options={houseStatus.map((rel, idx) => ({ label: rel, value: idx }))} />
      </FormGroup>
      <FormGroup labelFor="propinsi" label="Propinsi Tempat Lahir">
        <Select id="propinsi" label="Pilih propinsi tempat lahir" options={[
          { label: 'Sulawesi Utara', value: 0 },
          { label: 'Sulawesi Selatan', value: 1 },
        ]} />
      </FormGroup>
      <FormGroup labelFor="kota" label="Kota/Kabupaten Tempat Lahir">
        <Select id="kota" label="Pilih kota/kabupaten tempat lahir" options={[
          { label: 'Manado', value: 0 },
          { label: 'Minahasa', value: 1 },
        ]} />
      </FormGroup>
      <FormGroup labelFor="alamat" label="Alamat">
        <TextArea id="alamat" placeholder="Alamat" style={{ width: '100%' }} />
      </FormGroup>
      <FormGroup label="Kecamatan" labelFor="kecamatan">
        <InputGroup id="kecamatan" placeholder="Kecamatan" />
      </FormGroup>
      <FormGroup label="Kelurahan" labelFor="kelurahan">
        <InputGroup id="kelurahan" placeholder="Kelurahan" />
      </FormGroup>
      <FormGroup label="Kode Pos" labelFor="postcode">
        <InputGroup min={0} type="number" id="postcode" placeholder="Kode Pos" />
      </FormGroup>
      <FormGroup labelFor="country" label="Negara">
        <Select id="country" label="Pilih Negara" options={[
          { label: 'Indonesia', value: 0 },
        ]} />
      </FormGroup>
      <FormGroup label="Nomor Telepon/HP" labelFor="phonenumber">
        <InputGroup type="number" id="phonenumber" placeholder="Nomor Telepon/HP" />
      </FormGroup>
      <FormGroup label="Email" labelFor="email">
        <InputGroup type="email" id="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Button onClick={nextPage} text="Selanjutnya" />
      </FormGroup>
    </Box>
  )
}

export default Citizen
