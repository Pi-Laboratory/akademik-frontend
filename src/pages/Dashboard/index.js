import { Button, H2 } from "@blueprintjs/core";
import { Box, Divider, Flex } from "components";

const Dashboard = () => {
  return (
    <Flex sx={{ pt: 4, mx: 3, flexDirection: "column" }}>
      <Flex sx={{ alignItems: "baseline" }}>
        <Box>
          <Box as={H2}>Tahun Ajaran 2021/2022</Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button rightIcon="share" text="Website Resmi" />
        </Box>
      </Flex>
      <Divider />
    </Flex >
  )
}

export default Dashboard;