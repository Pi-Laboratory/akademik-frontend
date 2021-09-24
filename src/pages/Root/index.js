import { Mahasiswa } from "pages/Mahasiswa";
import { Kurikulum } from "pages/Kurikulum";
import { Jadwal } from "pages/Jadwal";
import Presensi from "pages/PresensiNilai"
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import ManajemenRuang from "pages/ManajemenRuang";
import AkunSementara from "pages/AkunSementara";
import { DivisiPendidikan } from "pages/DivisiPendidikan";
import { Navigation, RootProvider } from "./hoc";
import Layout from "./Layout";
import { useRouteMatch } from "react-router";
import Helmet from "react-helmet";
import Users from "pages/Users";
import Pengajar from "pages/Pengajar";
import Pegawai from "pages/Pegawai";
import { MataKuliah } from "pages/MataKuliah";
import { Semester } from "pages/Semester";
import { Kelas } from "pages/Kelas";

const navigation = [
  {
    "title": "Dashboard",
    "text": "Dashboard",
    "component": Dashboard,
    "path": "/",
    "icon": "blank",
    "exact": true
  },
  {
    "title": "Kurikulum",
    "text": "Kurikulum",
    "component": Kurikulum,
    "path": "/kurikulum/",
    "icon": "book"
  },
  {
    "title": "Mata Kuliah",
    "text": "Mata Kuliah",
    "component": MataKuliah,
    "path": "/mata-kuliah/",
    "icon": "blank"
  },
  {
    "title": "Semester",
    "text": "Semester",
    "component": Semester,
    "path": "/semester/",
    "icon": "blank"
  },
  {
    "title": "Jadwal",
    "text": "Jadwal",
    "component": Jadwal,
    "path": "/jadwal/",
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
    "title": "Pegawai",
    "text": "Pegawai",
    "component": Pegawai,
    "path": "/pegawai",
    "icon": "blank"
  },
  {
    "title": "Pengajar",
    "text": "Pengajar",
    "component": Pengajar,
    "path": "/pengajar",
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
    "title": "Kelas",
    "text": "Kelas",
    "component": Kelas,
    "path": "/kelas",
    "icon": "inherited-group"
  },
  {
    "title": "Divisi Pendidikan",
    "text": "Divisi Pendidikan",
    "component": DivisiPendidikan,
    "path": "/divisi-pendidikan",
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
  {
    "title": "Users",
    "text": "Users",
    "component": Users,
    "path": "/users",
    "icon": "blank",
    "permission": "admin"
  }
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