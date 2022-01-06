import PresensiNilaiDetail from "pages/Lecturer.PresensiNilai.Detail";
import PresensiNilaiList from "pages/Lecturer.PresensiNilai.List";
import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";

const navigation = [
  {
    "component": PresensiNilaiList,
    "path": "/",
    "hide": true,
    "exact": true,
  },
  {
    "component": PresensiNilaiDetail,
    "path": "/jadwal/:subject_lecturer_id",
    "hide": true,
    "exact": true,
  }
]

const PresensiNilai = () => {
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

export default PresensiNilai;