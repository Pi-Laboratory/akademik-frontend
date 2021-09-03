import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from './List'
import ListJurusan from 'pages/DivisiPendidikan.ListJurusan'

export const DivisiPendidikan = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "title": "List Program Studi",
      "text": "Program Studi",
      "component": List,
      "path": `/`,
      exact: true,
      icon: 'home'
    },
    {
      "title": "List Jurusan",
      "text": "Jurusan",
      "component": ListJurusan,
      "path": `/list-jurusan`,
      exact: true
    }
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Divisi Pendidikan</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}