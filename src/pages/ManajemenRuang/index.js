import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";
import Details from "pages/ManajemenRuang.Details";
import List from "pages/ManajemenRuang.List";
import { useMemo } from "react";


const DosenPejabat = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "title": "Manajemen Ruang",
      "text": "Manajemen Ruang",
      "component": List,
      "path": "/",
      "exact": true,
      "icon": "blank"
    },
    {
      "component": Details,
      "path": "/:id",
      "exact": true,
      "hide": true
    },
  ]), []);
  return (
    <>
      <Helmet>
        <title>Manajemen Ruang</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </>
  )
}

export default DosenPejabat;