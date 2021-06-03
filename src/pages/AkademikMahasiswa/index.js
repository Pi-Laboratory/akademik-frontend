import { Layout } from './Layout'
import React, { useMemo } from 'react'
import { RootProvider } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import Students from './Students'
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
      exact: true
    },
    {
      "title": "Mahasiswa",
      "text": "Mahasiswa",
      "component": Students,
      "path": `${path}/mahasiswa`,
      exact: true
    },
  ]), [path]);

  return (
    <RootProvider navigation={navigation}>
      <Layout />
    </RootProvider>
  )
}
