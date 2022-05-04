import { H2 } from "@blueprintjs/core";
import { Box } from "components";

const Header = () => {
  return (
    <Box sx={{ px: 3 }}>
      <Box as={H2} sx={{ m: 0, mb: 4 }}>Kurikulum</Box>
    </Box>
  )
}

export default Header;