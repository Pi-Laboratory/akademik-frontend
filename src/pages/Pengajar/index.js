import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";
import List from "pages/Pengajar.List";
import Detail from "pages/Pengajar.Details";

const navigation = [
  {
    "component": List,
    "path": "/pengajar",
    "icon": "blank",
    "exact": true,
  },
  {
    "component": Detail,
    "path": "/pengajar/:id",
    "icon": "blank",
    "exact": true,
  },
]

const Pengajar = () => {
  const { path } = useRouteMatch();
  return (
    <Navigation base={path} navigation={navigation}>
      <Helmet>
        <title>Pengajar</title>
      </Helmet>
      <Layout />
    </Navigation>
  )
}

export default Pengajar;