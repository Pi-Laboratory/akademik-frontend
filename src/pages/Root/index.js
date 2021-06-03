import { AkademikMahasiswa } from "pages/AkademikMahasiswa";
import { Kurikulum } from "pages/Kurikulum";
import { Jadwal } from "pages/Jadwal";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import ManajemenRuang from "pages/ManejemenRuang";
import ProgramStudi from "pages/ProgramStudi";
import Presensi from "pages/Presensi"
import AkunSementara from "pages/AkunSementara";

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
    "title": "Akademik Kemahasiswaan",
    "text": "Kemahasiswaan",
    "component": AkademikMahasiswa,
    "path": "/akademik-mahasiswa",
    "icon": "user"
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
    "text": "Jadwal Kelas",
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
    "title": "Program Studi",
    "text": "Program Studi",
    "component": ProgramStudi,
    "path": "/program-studi",
    "icon": "blank"
  },
  {
    "title": "Presensi",
    "text": "Presensi",
    "component": Presensi,
    "path": "/presensi",
    "icon": "blank"
  },
  {
    "title": "Akun Sementara",
    "text": "Akun Sementara",
    "component": AkunSementara,
    "path": "/akun-sementara",
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