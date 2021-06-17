import { Box, Flex } from "components";
import PresensiDetail from "pages/PresensiNilai.Presensi.Details";
import { Route, Switch } from "react-router-dom";
import List from "./List";

const Layout = () => {
  return (
    <Flex sx={{
      flexDirection: "column",
    }}>
      <Box>
        <Switch>
          <Route path="/presensi-nilai/presensi/:nim" component={PresensiDetail} />
          <Route path="/presensi-nilai/presensi" component={List} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Layout;