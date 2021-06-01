import { Box, Flex } from "components";
import DosenDetail from "pages/DosenPejabat.Dosen.Details";
import { Route, Switch } from "react-router-dom";
import List from "./List";

const Layout = () => {
  return (
    <Flex sx={{
      flexDirection: "column",
    }}>
      <Box>
        <Switch>
          <Route path="/dosen-pejabat/dosen/:nip" component={DosenDetail} />
          <Route path="/dosen-pejabat/dosen" component={List} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Layout;