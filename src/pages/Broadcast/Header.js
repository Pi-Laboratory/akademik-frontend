import { H2 } from "@blueprintjs/core";
import { Box, Divider } from "components";

const Header = () => {
  return (
    <>
      <Box as={H2} sx={{ m: 0, mb: 4, ml: 3 }}>Broadcast</Box>
      <Divider sx={{ mt: 0, mb: "8px" }} />
    </>
  );
}

export default Header;