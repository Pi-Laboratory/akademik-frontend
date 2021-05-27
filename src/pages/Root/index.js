import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Users from "pages/Users";
import Kurikulum from "pages/Kurikulum";
import Semester from "pages/Semester";
import ManajemenRuang from "pages/ManejemenRuang";
import Dosen from "pages/Dosen";


import { RootProvider } from "./hoc";
import Layout from "./Layout";

const Navigation = [
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
    "text": "Users",
    "component": Users,
    "path": "/users",
    "icon": "blank"
  },
  {
    "title": "Nama Servis",
    "text": "Kurikulum",
    "component": Kurikulum,
    "path": "/kurikulum",
    "icon": ""
  },
  {
    "title": "Nama Servis",
    "text": "Semester",
    "component": Semester,
    "path": "/semester",
    "icon": ""
  },
  {
    "title": "Nama Servis",
    "text": "Manajemen Ruang",
    "component": ManajemenRuang,
    "path": "/manajemen-ruang",
    "icon": ""
  },
  {
    "title": "Nama Servis",
    "text": "Dosen",
    "component": Dosen,
    "path": "/dosen",
    "icon": ""
  },
  {
    "title": "Nama Servis",
    "text": "Settings",
    "component": Settings,
    "path": "/settings",
    "icon": "cog"
  }
]

const Root = () => {
  return (
    <RootProvider navigation={Navigation}>
      <Layout />
    </RootProvider>
  )
}

export default Root;