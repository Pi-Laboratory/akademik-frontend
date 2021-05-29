import { Box, Divider, Flex } from "components";
import Matakuliah from "pages/Kurikulum.MataKuliah";
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
          <Route path="/kurikulum/:nip" component={Matakuliah} />
          <Route path="/kurikulum" component={List} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Layout;