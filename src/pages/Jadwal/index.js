import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from 'pages/Jadwal.List';

export const Jadwal = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": List,
      "path": `/jadwal`,
      exact: true,
      icon: 'home'
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