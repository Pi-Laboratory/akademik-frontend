import { Box, Divider, Flex } from "components";
import Header from "./Header";
import Side from "./Side";
import Main from "./Main";

export const Layout = () => {
  return (
    <Flex sx={{ pt: 4, mr: 3, flexDirection: "column" }}>
      <Header />
      <Divider />
      <Flex>
        <Box sx={{ pt: 3, mx: 3, flexGrow: 1 }}>
          <Main />
        </Box>
        <Box sx={{ pt: 3, flexShrink: 0, width: 230 }}>
          <Side />
        </Box>
      </Flex>
    </Flex >
  )
}