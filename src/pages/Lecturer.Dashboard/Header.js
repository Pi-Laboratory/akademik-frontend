import { Button, Classes } from "@blueprintjs/core";
import { Box, Flex } from "components";

const Header = () => {
  return (
    <Box sx={{ ml: 3 }}>
      <Flex sx={{ alignItems: "center", mb: 4 }}>
        <Box>
          <Box as="h2" className={`${Classes.HEADING}`}>Tahun Ajaran 2021/2022</Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button rightIcon="share" text="Website Resmi" />
        </Box>
      </Flex>
    </Box>
  )
}

export default Header;