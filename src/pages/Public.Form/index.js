import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import { Detail } from "./Detail";

export const PublicForm = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": Detail,
      "path": `/`,
      "hide": true,
      "exact": true
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Mahasiswa</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}
