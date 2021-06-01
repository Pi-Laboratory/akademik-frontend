import { Layout } from './Layout'
import React, { useMemo } from 'react'
import { RootProvider } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from './List'
import MataKuliah from 'pages/Kurikulum.MataKuliah'
import Semester from 'pages/Kurikulum.Semester'

export const Kurikulum = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "title": "Halaman Utama",
      "text": "Halaman Utama",
      "component": List,
      "path": `${path}`,
      exact: true,
      icon: 'home'
    },
    {
      "title": "MataKuliah",
      "text": "Mata Kuliah",
      "component": MataKuliah,
      "path": `${path}/mata-kuliah`,
      exact: true
    },
    {
      "title": "Semester",
      "text": "Semester",
      "component": Semester,
      "path": `${path}/semester`,
      exact: true
    },
   
  ]), [path]);

  return (
    <RootProvider navigation={navigation}>
      <Layout />
    </RootProvider>
  )
}
