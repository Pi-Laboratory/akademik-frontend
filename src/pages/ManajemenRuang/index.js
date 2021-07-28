import ManajemenRuangRuang from "pages/ManajemenRuang.Ruang";
import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";

const navigation = [
  {
    "title": "Manajemen Ruang",
    "text": "Manajemen Ruang",
    "component": ManajemenRuangRuang,
    "path": "/manajemen-ruang/ruang",
    "icon": "blank"
  },
  // {
  //   "title": "Nilai",
  //   "text": "Nilai",
  //   "component": PresensiNilaiNilai,
  //   "path": "/nilai",
  //   "icon": "blank"
  // }
]

const DosenPejabat = () => {
  const { path } = useRouteMatch();
  return (
    <Navigation base={path} navigation={navigation}>
      <Helmet>
        <title>Manajemen Ruang</title>
      </Helmet>
      <Layout />
    </Navigation>
  )
}

export default DosenPejabat;