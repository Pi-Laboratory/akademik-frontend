import React from 'react'
import ListProvider from 'components/list'
import { Layout } from './Layout'

const ListKurikulum = () => {
  return (
    <ListProvider
      filter={{
        "year": String(new Date().getFullYear()),
        "study_program_id": undefined
      }}
    >
      <Layout />
    </ListProvider>
  )
}

export default ListKurikulum;
