import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from 'pages/Broadcast.List';

export const Broadcast = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": List,
      "path": `/`,
      "hide": true,
      "exact": true
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Broadcast - Akademik</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}