import { Box, Divider, Flex } from "components";
import DosenDetail from "pages/Dosen.Details";
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
      <Divider />
      <Box>
        <Switch>
          <Route path="/dosen/:nip" component={DosenDetail} />
          <Route path="/dosen" component={List} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Layout;