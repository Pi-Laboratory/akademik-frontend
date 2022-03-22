import { Navigation } from "pages/Root/hoc";
import { Helmet } from "react-helmet";
import { useRouteMatch } from "react-router-dom";
import { useMemo } from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import Layout from "./Layout";
import { EmployeeProvider } from "./hoc";

const PegawaiDetail = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": Profile,
      "path": `/`,
      "exact": true,
      "title": "Profile"
    },
    {
      "component": Settings,
      "path": `/settings`,
      "title": "Settings"
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Pegawai - Akademik</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <EmployeeProvider>
          <Layout />
        </EmployeeProvider>
      </Navigation>
    </>
  )
}

export default PegawaiDetail;