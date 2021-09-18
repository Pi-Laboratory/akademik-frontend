import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from 'pages/MataKuliah.List'
import Detail from 'pages/MataKuliah.Details';

export const MataKuliah = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": List,
      "path": `/`,
      "hide": true,
      "exact": true
    },
    {
      "component": Detail,
      "path": `/:id`,
      "hide": true,
      "exact": true
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Mata Kuliah</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}