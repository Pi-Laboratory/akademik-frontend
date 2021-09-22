import React from 'react'
import ListProvider from 'components/list'
import { Layout } from './Layout'

const DaftarMahasiswa = () => {
  return (
    <ListProvider
      filter={{
        "generation": String(new Date().getFullYear()),
        "study_program_id": undefined
      }}
    >
      <Layout />
    </ListProvider>
  )
}

export default DaftarMahasiswa
