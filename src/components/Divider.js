import { Classes } from "@blueprintjs/core"
import { Box } from "./Grid"

export const Divider = ({ sx }) => {
  return (
    <Box className={`${Classes.DIVIDER}`} sx={{ my: 3, ...sx }} />
  )
}