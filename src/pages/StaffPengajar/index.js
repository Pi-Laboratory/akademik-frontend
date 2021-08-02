import StaffPengajarList from "pages/StaffPengajar.List";
import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";

const navigation = [
  {
    "title": "Staff dan Pengajar",
    "text": "Staff dan Pengajar",
    "component": StaffPengajarList,
    "path": "/list",
    "icon": "blank"
  },
]

const StaffPengajar = () => {
  const { path } = useRouteMatch();
  return (
    <Navigation base={path} navigation={navigation}>
      <Helmet>
        <title>Staff - Pengajar</title>
      </Helmet>
      <Layout />
    </Navigation>
  )
}

export default StaffPengajar;