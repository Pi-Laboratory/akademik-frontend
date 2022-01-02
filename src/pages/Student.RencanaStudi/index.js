import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useRouteMatch } from 'react-router'
import List from 'pages/Student.RencanaStudi.List'
import Detail from 'pages/Student.RencanaStudi.Details';
import Print from 'pages/Student.RencanaStudi.Details.Print';

const RencanaStudi = () => {
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
      "path": `/:study_id`,
      "hide": true,
      "exact": true
    },
    {
      "component": Print,
      "path": `/:study_id/print`,
      "hide": true,
      "exact": true
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Rencana Studi</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}

export default RencanaStudi;