import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import ProgramStudi from 'pages/DivisiPendidikan.ProgramStudi'
import ProgramStudiDetail from 'pages/DivisiPendidikan.ProgramStudi.Detail'
import Jurusan from 'pages/DivisiPendidikan.Jurusan'
import JurusanDetail from 'pages/DivisiPendidikan.Jurusan.Detail'

export const DivisiPendidikan = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "title": "List Program Studi",
      "text": "Program Studi",
      "component": ProgramStudi,
      "path": `/program-studi`,
      "exact": true,
      "icon": 'home'
    },
    {
      "component": ProgramStudiDetail,
      "path": `/program-studi/:id`,
      "hide": true,
      "exact": true
    },
    {
      "title": "List Jurusan",
      "text": "Jurusan",
      "component": Jurusan,
      "path": `/jurusan`,
      "exact": true
    },
    {
      "component": JurusanDetail,
      "path": `/jurusan/:id`,
      "hide": true,
      "exact": true
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