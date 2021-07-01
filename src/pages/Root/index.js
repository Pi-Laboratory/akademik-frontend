import { Mahasiswa } from "pages/Mahasiswa";
import { Kurikulum } from "pages/Kurikulum";
import { Jadwal } from "pages/Jadwal";
import Presensi from "pages/PresensiNilai"
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import ManajemenRuang from "pages/ManejemenRuang";
import AkunSementara from "pages/AkunSementara";
import DivisiPendidikan from "pages/DivisiPendidikan";

import { Navigation, RootProvider } from "./hoc";
import Layout from "./Layout";
import { useRouteMatch } from "react-router";
import Helmet from "react-helmet";
import DosenPejabat from "pages/DosenPejabat";

const navigation = [
  {
    "title": "Nama Servis",
    "text": "Dashboard",
    "component": Dashboard,
    "path": "/",
    "icon": "blank",
    "exact": true
  },
  {
    "title": "Nama Servis",
    "text": "Kurikulum",
    "component": Kurikulum,
    "path": "/kurikulum/",
    "icon": "book"
  },
  {
    "title": "Nama Servis",
    "text": "Jadwal dan Kelas",
    "component": Jadwal,
    "path": "/jadwal/",
    "icon": "blank"
  },
  {
    "title": "Nama Servis",
    "text": "Manajemen Ruang",
    "component": ManajemenRuang,
    "path": "/manajemen-ruang",
    "icon": "blank"
  },
  {
    "title": "Dosen dan Pejabat",
    "text": "Dosen dan Pejabat",
    "component": DosenPejabat,
    "path": "/dosen-pejabat",
    "icon": "blank"
  },
  {
    "title": "Presensi",
    "text": "Presensi dan Nilai",
    "component": Presensi,
    "path": "/presensi-nilai",
    "icon": "blank"
  },
  {
    "title": "Akademik Kemahasiswaan",
    "text": "Mahasiswa",
    "component": Mahasiswa,
    "path": "/mahasiswa",
    "icon": "user"
  },
  {
    "title": "Divisi Pendidikan",
    "text": "Divisi Pendidikan",
    "component": DivisiPendidikan,
    "path": "/divisi-pendidikan",
    "icon": "blank"
  }, 
  {
    "title": "Penerimaan mahasiswa baru",
    "text": "Penerimaan",
    "component": AkunSementara,
    "path": "/penerimaan",
    "icon": "blank"
  },
  {
    "title": "Settings",
    "text": "Settings",
    "component": Settings,
    "path": "/settings",
    "icon": "cog"
  },
]

const Root = () => {
  const { path } = useRouteMatch();
  return (
    <RootProvider>
      <Helmet>
        <title>Dashboard - Portal Akademik</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <Layout />
      </Navigation>
    </RootProvider>
  )
}

export default Root;