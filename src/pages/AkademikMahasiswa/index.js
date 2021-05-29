import { Layout } from './Layout'
import React, { useMemo } from 'react'
import { RootProvider } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import Students from './Students'
import Curriculums from './Curriculums'
import Generations from './Generations'

export const AkademikMahasiswa = () => {
  const { path } = useRouteMatch();
  document.title = "Dashboard - Akademik Kemahasiswaan"
  const navigation = useMemo(() => ([
    {
      "title": "Halaman Utama",
      "text": "Halaman Utama",
      "component": Generations,
      "path": `${path}`,
      exact: true,
      icon: 'home'
    },
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
