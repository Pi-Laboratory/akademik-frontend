import { Box, Flex } from "components";
import ManajemenRuangDetail from "pages/ManajemenRuang.Ruang.Details";
import { Route, Switch } from "react-router-dom";
import List from "./List";

const Layout = () => {
  return (
    <Flex sx={{
      flexDirection: "column",
    }}>
      <Box>
        <Switch>
          <Route path="/manajemen-ruang/ruang/:nim" component={ManajemenRuangDetail} />
          <Route path="/manajemen-ruang/ruang" component={List} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Layout;