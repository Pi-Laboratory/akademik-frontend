import { Box, Divider, Flex } from "components";
import MahasiswaDetail from "pages/Mahasiswa.Details";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import List from "./List";

const Layout = () => {
  return (
    <Flex sx={{
      pt: 4,
      mr: 3,
      flexDirection: "column",
    }}>
      <Header />
      <Divider sx={{ mb: 0 }} />
      <Box>
        <Switch>
          {/* <Route path="" component={MahasiswaDetail} /> */}
          <Route path="" component={List} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Layout;