import { Box, Container } from "components";
import Header from "./Header";
import Router from "./Router";
import Sidemenu from "./Sidemenu";

const Layout = () => {
  return (
    <Box sx={{
      height: "100%",
      width: "100%",
      bg: "gray.1"
    }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5
        }}
      >
        <Header />
      </Box>
      <Container
        sx={{
          pt: "50px",
          height: "100%"
        }}
      >
        <Box sx={{
          position: "fixed",
          width: 180,
          top: 50,
          bottom: 0,
          zIndex: 1
        }}>
          <Sidemenu />
        </Box>
        <Box sx={{
          ml: 180
        }}>
          <Router />
        </Box>
      </Container>
    </Box>
  )
}

export default Layout;