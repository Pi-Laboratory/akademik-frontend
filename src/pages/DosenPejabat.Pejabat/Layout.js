import { Box, Flex } from "components";
import DosenPejabatPejabatDetail from "pages/DosenPejabat.Pejabat.Details";
import { Route, Switch } from "react-router-dom";
import List from "./List";

const Layout = () => {
  return (
    <Flex sx={{
      flexDirection: "column",
    }}>
      <Box>
        <Switch>
          <Route path="/dosen-pejabat/pejabat/:nip" component={DosenPejabatPejabatDetail} />
          <Route path="/dosen-pejabat/pejabat" component={List} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Layout;