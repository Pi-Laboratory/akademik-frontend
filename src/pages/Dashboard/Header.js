import { Button, Classes } from "@blueprintjs/core";
import { Box, Flex } from "components";

const Header = () => {
  return (
    <Box sx={{ ml: 3 }}>
      <Flex sx={{ alignItems: "center", mb: 3 }}>
        <Box>
          <Box as="h2" className={`${Classes.HEADING}`}>Tahun Ajaran 2021/2022</Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button rightIcon="share" text="Website Resmi" />
        </Box>
      </Flex>
      <Box>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      </Box>
    </Box>
  )
}

export default Header;