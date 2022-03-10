import { PublicForm } from "pages/Public.Form";
import { PublicSecurity } from "pages/Public.Security";
import { PublicDashboard } from "pages/Public.Dashboard";

import StudentRencanaStudi from "pages/Student.RencanaStudi";
import StudentHasilStudi from "pages/Student.HasilStudi";

import { LecturerBimbingan } from "pages/Lecturer.Bimbingan";
import { LecturerJadwal } from "pages/Lecturer.Jadwal";
import LecturerPresensiNilai from "pages/Lecturer.PresensiNilai";

import { Bimbingan } from "pages/Bimbingan";
import { Mahasiswa } from "pages/Mahasiswa";
import { Kurikulum } from "pages/Kurikulum";
import { Jadwal } from "pages/Jadwal";
// import Presensi from "pages/PresensiNilai"
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import ManajemenRuang from "pages/ManajemenRuang";
import { AkunSementara } from "pages/AkunSementara";
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
import { RencanaStudi } from "pages/RencanaStudi";
import { useClient } from "components";
import { useMemo } from "react";
import { StudentProfile } from "pages/Student.Profile";

const navigation = [
  {
    "title": "Dashboard",
    "text": "Dashboard",
    "component": Dashboard,
    "path": "/",
    "icon": "blank",
    "exact": true,
    "permission": "Admin"
  },
  {
    "title": "Kurikulum",
    "text": "Kurikulum",
    "component": Kurikulum,
    "path": "/kurikulum/",
    "icon": "book",
    "permission": "Admin"
  },
  {
    "title": "Mata Kuliah",
    "text": "Mata Kuliah",
    "component": MataKuliah,
    "path": "/mata-kuliah/",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Semester",
    "text": "Semester",
    "component": Semester,
    "path": "/semester/",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Jadwal",
    "text": "Jadwal",
    "component": Jadwal,
    "path": "/jadwal/",
    "icon": "blank",
    "permission": "Admin"
  },
  // {
  //   "title": "Presensi",
  //   "text": "Presensi dan Nilai",
  //   "component": Presensi,
  //   "path": "/presensi-nilai",
  //   "icon": "blank",
  //   "permission": "Admin"
  // },
  {
    "title": "Pegawai",
    "text": "Pegawai",
    "component": Pegawai,
    "path": "/pegawai",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Pengajar",
    "text": "Pengajar",
    "component": Pengajar,
    "path": "/pengajar",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Bimbingan",
    "text": "Bimbingan",
    "component": Bimbingan,
    "path": "/bimbingan",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Akademik Kemahasiswaan",
    "text": "Mahasiswa",
    "component": Mahasiswa,
    "path": "/mahasiswa",
    "icon": "user",
    "permission": "Admin"
  },
  {
    "title": "Rencana Studi",
    "text": "Rencana Studi",
    "component": RencanaStudi,
    "path": "/rencana-studi",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Kelas",
    "text": "Kelas",
    "component": Kelas,
    "path": "/kelas",
    "icon": "inherited-group",
    "permission": "Admin"
  },
  {
    "title": "Divisi Pendidikan",
    "text": "Divisi Pendidikan",
    "component": DivisiPendidikan,
    "path": "/divisi-pendidikan",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Manajemeen Ruang",
    "text": "Manajemen Ruang",
    "component": ManajemenRuang,
    "path": "/manajemen-ruang",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Penerimaan mahasiswa baru",
    "text": "Penerimaan",
    "component": AkunSementara,
    "path": "/penerimaan",
    "icon": "blank",
    "permission": "Admin"
  },
  {
    "title": "Settings",
    "text": "Settings",
    "component": Settings,
    "path": "/settings",
    "icon": "cog",
    "permission": "Admin"
  },
  {
    "title": "Users",
    "text": "Users",
    "component": Users,
    "path": "/users",
    "icon": "blank",
    "permission": "Admin"
  },

  {
    "title": "Dashboard",
    "text": "Dashboard",
    "component": Dashboard,
    "path": "/",
    "icon": "blank",
    "exact": true,
    "permission": "Lecturer"
  },
  {
    "title": "Bimbingan",
    "text": "Bimbingan",
    "component": LecturerBimbingan,
    "path": "/bimbingan/",
    "icon": "blank",
    "permission": "Lecturer"
  },
  {
    "title": "Jadwal",
    "text": "Jadwal",
    "component": LecturerJadwal,
    "path": "/jadwal/",
    "icon": "blank",
    "permission": "Lecturer"
  },
  {
    "title": "Penilaian",
    "text": "Penilaian",
    "component": LecturerPresensiNilai,
    "path": "/penilaian/",
    "icon": "blank",
    "permission": "Lecturer"
  },

  {
    "title": "Profile",
    "text": "Profile",
    "component": StudentProfile,
    "path": "/profile",
    "icon": "blank",
    "exact": true,
    "permission": "Student"
  },
  {
    "title": "Rencana Studi",
    "text": "Rencana Studi",
    "component": StudentRencanaStudi,
    "path": "/rencana-studi/",
    "icon": "blank",
    "permission": "Student"
  },
  {
    "title": "Hasil Studi",
    "text": "Hasil Studi",
    "component": StudentHasilStudi,
    "path": "/hasil-studi/",
    "icon": "blank",
    "permission": "Student"
  },

  {
    "title": "Dashboard",
    "text": "Dashboard",
    "component": PublicDashboard,
    "path": "/",
    "exact": true,
    "icon": "blank",
    "permission": "Public"
  },
  {
    "title": "Data Diri",
    "text": "Data Diri",
    "component": PublicForm,
    "path": "/bio",
    "icon": "blank",
    "permission": "Public"
  },
  {
    "title": "Security",
    "text": "Security",
    "component": PublicSecurity,
    "path": "/security",
    "icon": "blank",
    "permission": "Public"
  },
]

const Root = () => {
  const { path } = useRouteMatch();
  const client = useClient();
  const items = useMemo(() => {
    return navigation.filter(({ permission }) => {
      return permission ? permission === client.role : true;
    });
  }, [navigation, client.role]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RootProvider>
      <Helmet>
        <title>Dashboard - Portal Akademik</title>
      </Helmet>
      <Navigation base={path} navigation={items}>
        <Layout />
      </Navigation>
    </RootProvider>
  )
}

export default Root;