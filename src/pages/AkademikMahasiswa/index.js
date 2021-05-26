import { Layout } from './Layout'
import React, { useMemo } from 'react'
import { RootProvider } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import Students from './Students'
import Curriculums from './Curriculums'

export const AkademikMahasiswa = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "title": "Mahasiswa",
      "text": "Mahasiswa",
      "component": Students,
      "path": `${path}/mahasiswa`,
      exact: true
    },
    {
      "title": "Kurikulum",
      "text": "Kurikulum",
      "component": Curriculums,
      "path": `${path}/kurikulum`,
      exact: true
    },
  ]), [path]);

  return (
    <RootProvider navigation={navigation}>
      <Layout />
    </RootProvider>
  )
}
