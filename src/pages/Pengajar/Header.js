import { H2 } from "@blueprintjs/core"
import { Box } from "components"

export const Header = () => {
  return (
    <Box sx={{ mx: 3 }}>
      <Box as={H2} sx={{ flexDirection: "column", height: "100%", mb: 4 }}>Pengajar</Box>
    </Box>
  )
}