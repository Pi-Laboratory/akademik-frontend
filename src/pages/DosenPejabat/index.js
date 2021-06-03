import DosenPejabatDosen from "pages/DosenPejabat.Dosen";
import DosenPejabatPejabat from "pages/DosenPejabat.Pejabat";
import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";

const navigation = [
  {
    "title": "Dosen",
    "text": "Dosen",
    "component": DosenPejabatDosen,
    "path": "/dosen",
    "icon": "blank"
  },
  {
    "title": "Pejabat",
    "text": "Pejabat",
    "component": DosenPejabatPejabat,
    "path": "/pejabat",
    "icon": "blank"
  }
]

const DosenPejabat = () => {
  const { path } = useRouteMatch();
  return (
    <Navigation base={path} navigation={navigation}>
      <Helmet>
        <title>Dosen - Pejabat</title>
      </Helmet>
      <Layout />
    </Navigation>
  )
}

export default DosenPejabat;