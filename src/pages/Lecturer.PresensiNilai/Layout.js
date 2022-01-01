import { Flex } from "components"
import { Header } from "./Header"
import { Router } from "./Router"

export const Layout = () => {
  return (
    <Flex sx={{
      py: 4,
      flexDirection: "column"
    }}>
      <Header />
      <Router />
    </Flex>
  )
}