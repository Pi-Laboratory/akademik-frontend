import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from './List'
import Kelas from 'pages/Jadwal.Kelas'
import JamPerHari from 'pages/Jadwal.JamPerHari';
export const Jadwal = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "title": "Jadwal",
      "text": "Jadwal",
      "component": List,
      "path": `/`,
      exact: true,
      icon: 'home'
    },
    {
      "title": "Kelas",
      "text": "Kelas",
      "component": Kelas,
      "path": `/kelas`,
      exact: true
    },
    {
      "title": "Jam per Hari",
      "text": "Jam",
      "component": JamPerHari,
      "path": `/jam-per-hari`,
      exact: true
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Jadwal</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}