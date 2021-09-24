import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";
import Details from "pages/Pegawai.Details";
import List from "pages/Pegawai.List";

const navigation = [
  {
    "component": List,
    "path": "/pegawai",
    "icon": "blank",
    "exact": true,
  },
  {
    "component": Details,
    "path": "/pegawai/:id",
    "icon": "blank",
    "exact": true,
  },
]

const Pegawai = () => {
  const { path } = useRouteMatch();
  return (
    <Navigation base={path} navigation={navigation}>
      <Helmet>
        <title>Pegawai</title>
      </Helmet>
      <Layout />
    </Navigation>
  )
}

export default Pegawai;