import StaffPengajarList from "pages/StaffPengajar.List";
import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router";
import { Layout } from "./Layout";
import StaffPengajarDetail from "pages/StaffPengajar.Details";

const navigation = [
  {
    "title": "Staff dan Pengajar",
    "component": StaffPengajarList,
    "path": "/staff-dan-pengajar",
    "icon": "blank",
    "exact": true,
  },
  {
    "component": StaffPengajarDetail,
    "path": "/staff-dan-pengajar/:id",
    "icon": "blank",
    "exact": true,
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