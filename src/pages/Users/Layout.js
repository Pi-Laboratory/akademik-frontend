import { Box, Divider, Flex } from "components";
import Filter from "./Filter";
import Header from "./Header";
import List from "./List";

const Layout = () => {
  return (
    <Flex sx={{
      pt: 4,
      mr: 3,
      flexDirection: "column",
    }}>
      <Box sx={{ mb: 3 }}>
        <Header />
        <Divider />
      </Box>
      <Box sx={{ mx: 3 }}>
        <Filter />
      </Box>
      <Box>
        <List />
      </Box>
    </Flex>
  );
}

export default Layout;