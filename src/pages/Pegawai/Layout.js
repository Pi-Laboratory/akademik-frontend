import { Flex } from "components"
import { Router } from "./Router"

export const Layout = () => {
  return (
    <Flex sx={{
      pt: 4,
      mr: 3,
      flexDirection: "column"
    }}>
      <Router />
    </Flex>
  )
}