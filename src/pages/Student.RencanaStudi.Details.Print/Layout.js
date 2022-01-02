import { AnchorButton } from "@blueprintjs/core";
import { Box, useClient } from "components";
import { forwardRef, useEffect } from "react";
import { useParams } from "react-router";

const Layout = () => {
  const client = useClient();
  const params = useParams();

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      Print
    </Box >
  )
}

export default Layout;