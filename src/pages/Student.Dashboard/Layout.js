import { Box, Divider, Flex } from "components";
import Header from "./Header";
import Side from "./Side";
import Main from "./Main";

const Layout = () => {
  return (
    <Flex sx={{ pt: 4, mr: 3, flexDirection: "column" }}>
      <Header />
      <Divider />
      <Flex>
        <Box sx={{ mt: 3, mx: 3, flexGrow: 1 }}>
          <Main />
        </Box>
        <Box sx={{ flexShrink: 0, width: 230 }}>
          <Side />
        </Box>
      </Flex>
    </Flex >
  )
}

export default Layout;