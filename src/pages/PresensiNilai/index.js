import PresensiNilaiPresensi from "pages/PresensiNilai.Presensi";
import PresensiNilaiNilai from "pages/PresensiNilai.Nilai";
import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";

const navigation = [
  {
    "title": "Presensi",
    "text": "Presensi",
    "component": PresensiNilaiPresensi,
    "path": "/presensi",
    "icon": "blank"
  },
  {
    "title": "Nilai",
    "text": "Nilai",
    "component": PresensiNilaiNilai,
    "path": "/nilai",
    "icon": "blank"
  }
]

const DosenPejabat = () => {
  const { path } = useRouteMatch();
  return (
    <Navigation base={path} navigation={navigation}>
      <Helmet>
        <title>Presensi - Nilai</title>
      </Helmet>
      <Layout />
    </Navigation>
  )
}

export default DosenPejabat;