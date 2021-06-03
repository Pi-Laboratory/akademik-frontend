import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import Students from './Students'
<<<<<<< HEAD
=======
import Curriculums from './Curriculums'
>>>>>>> 1a2f1a62ed0287d6acabbe721f3e0447b2b1eae9
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
      "path": `/mahasiswa`,
      exact: true
    },
<<<<<<< HEAD
  ]), [path]);
=======
    {
      "title": "Kurikulum",
      "text": "Kurikulum",
      "component": Curriculums,
      "path": `/kurikulum`,
      exact: true
    },
  ]), []);
>>>>>>> 1a2f1a62ed0287d6acabbe721f3e0447b2b1eae9

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
