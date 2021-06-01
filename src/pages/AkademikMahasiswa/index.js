import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import Students from './Students'
import Curriculums from './Curriculums'
import Generations from './Generations'

export const AkademikMahasiswa = () => {
  const { path } = useRouteMatch();
  document.title = "Dashboard - Akademik Kemahasiswaan"
  const navigation = useMemo(() => ([
    {
      "title": "Mahasiswa",
      "text": "Mahasiswa",
      "component": Students,
      "path": `/mahasiswa`,
      exact: true
    },
    {
      "title": "Kurikulum",
      "text": "Kurikulum",
      "component": Curriculums,
      "path": `/kurikulum`,
      exact: true
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Akademik Kemahasiswaan</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}
