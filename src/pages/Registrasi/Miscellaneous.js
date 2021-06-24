import { Box, Select } from 'components'
import { FormGroup, InputGroup, RadioGroup, Radio, Button, Tag, TextArea, ControlGroup, NumericInput } from '@blueprintjs/core'
import React from 'react'

const costRelation = ['Orang tua kandung', 'Orang tua angkat', 'Orang tua asuh', 'Saudara kandung', 'Saudara bukan kandung', 'Calon mertua', 'Lain-lain'];
const costSource = ['Orang tua/wali', 'Orang tua asuh', 'Beasiswa', 'ID', 'TB', 'Sendiri', 'Lain-lain'];
const occupationType = ['ASN', 'Swasta', 'Abri', 'Petani', 'Nelayan', 'Pelajar']

const Miscellaneous = () => {
  return (
    <Box>
      <FormGroup labelFor="persyaratan" label="Persyaratan">
        <RadioGroup inline>
          <Radio label="Lengkap" value="Lengkap" />
          <Radio label="Belum Lengkap" value="Belum Lengkap" />
        </RadioGroup>
      </FormGroup>
      <FormGroup labelFor="biaya" label="Hubungan Biaya">
        <Select id="biaya" label="Hubungan Biaya" options={costRelation.map((cost, idx) => ({ label: cost, value: idx }))} />
      </FormGroup>
      <FormGroup labelFor="dana" label="Sumber Dana">
        <Select id="dana" label="Sumber Dana" options={costSource.map((cost, idx) => ({ label: cost.toUpperCase(), value: idx }))} />
      </FormGroup>
      <FormGroup labelFor="beasiswa" label="Sumber Dana Beasiswa">
        <InputGroup id="beasiswa" placeholder="Sumber Dana Beasiswa" />
      </FormGroup>
      <FormGroup labelFor="jlhsaudara" label="Jumlah Saudara">
        <ControlGroup fill={true}>
          <NumericInput fill min={0} id="jlhsaudara" placeholder="Laki - laki" rightElement={<Tag>Laki - laki</Tag>} />
          <NumericInput fill min={0} id="jlhsaudara2" placeholder="Perempuan" rightElement={<Tag>Perempuan</Tag>} />
        </ControlGroup>
      </FormGroup>
      <FormGroup labelFor="status" label="Status Bekerja">
        <RadioGroup inline>
          <Radio label="Ya" value="Ya" />
          <Radio label="Tidak" value="Tidak" />
        </RadioGroup>
      </FormGroup>
      <FormGroup labelFor="occupation" label="Jenis Pekerjaan">
        <Select id="occupation" label="Jenis Pekerjaan" options={occupationType.map((type, idx) => ({ label: type.toUpperCase(), value: idx }))} />
      </FormGroup>
      <FormGroup labelFor="institution" label="Institusi/Kantor">
        <InputGroup id="institution" placeholder="Institusi/Kantor" />
      </FormGroup>
      <FormGroup labelFor="institutionaddress" label="Alamat Institusi/Kantor">
        <TextArea fill={true} id="institutionaddress" placeholder="Alamat Institusi/Kantor" />
      </FormGroup>
      <FormGroup labelFor="asurance" label="No. Asuransi">
        <InputGroup id="asurance" placeholder="No. Asuransi" />
      </FormGroup>
      <FormGroup labelFor="hobbies" label="Hobi">
        <InputGroup id="hobbies" placeholder="Hobi" />
      </FormGroup>
      <FormGroup>
        <Button text="Daftar" />
      </FormGroup>
    </Box>
  )
}

export default Miscellaneous
