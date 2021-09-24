import { Flex, Divider } from "components"
import { Header } from "./Header"
import { Router } from "./Router"

export const Layout = () => {
  return (
    <Flex sx={{
      pt: 4,
      mr: 3,
      flexDirection: "column"
    }}>
      <Header />
      <Divider sx={{ m: 0 }} />
      <Router />
    </Flex>
  )
}