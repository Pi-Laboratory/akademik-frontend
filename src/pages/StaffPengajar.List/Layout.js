import { Box, Flex } from "components";
import ListDetail from "pages/StaffPengajar.List.Details";
import { Route, Switch } from "react-router-dom";
import List from "./List";

const Layout = () => {
  return (
    <Flex sx={{
      flexDirection: "column",
    }}>
      <Box>
        <Switch>
          <Route path="/staff-dan-pengajar/list/:nip" component={ListDetail} />
          <Route path="/staff-dan-pengajar/list" component={List} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default Layout;