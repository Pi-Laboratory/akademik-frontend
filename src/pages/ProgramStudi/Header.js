import { Classes } from "@blueprintjs/core";
import { Box } from "components";

const Header = () => {
  return (
    <Box sx={{ ml: 3 }}>
      <Box as="h2" className={`${Classes.HEADING}`}>Program Studi</Box>
    </Box>
  )
}

export default Header;