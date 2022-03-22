import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";
import Details from "pages/Pegawai.Details";
import List from "pages/Pegawai.List";

const navigation = [
  {
    "component": List,
    "path": "/",
    "icon": "blank",
    "hide": true,
    "exact": true,
  },
  {
    "component": Details,
    "path": "/:id",
    "icon": "blank",
    "hide": true,
  },
]

const Pegawai = () => {
  const { path } = useRouteMatch();
  return (
    <Navigation base={path} navigation={navigation}>
      <Layout />
    </Navigation>
  )
}

export default Pegawai;