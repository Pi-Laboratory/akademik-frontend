import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Users from "pages/Users";
import ProgramStudi from "pages/ProgramStudi"
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
    "title": "Program Studi",
    "text": "Program Studi",
    "component": ProgramStudi,
    "path": "/program-studi",
    "icon": "bring-data"
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