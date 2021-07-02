import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from './List'

export const ManajemenRuang = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "title": "Halaman Utama",
      "text": "Halaman Utama",
      "component": List,
      "path": `/`,
      exact: true,
      icon: 'home'
    },
    // {
    //   "title": "MataKuliah",
    //   "text": "Mata Kuliah",
    //   "component": MataKuliah,
    //   "path": `/mata-kuliah`,
    //   exact: true
    // },
    // {
    //   "title": "Semester",
    //   "text": "Semester",
    //   "component": Semester,
    //   "path": `/semester`,
    //   exact: true
    // },
   
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Manajemen Ruang</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}