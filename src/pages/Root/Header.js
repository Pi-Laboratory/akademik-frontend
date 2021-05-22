import { Button } from "@blueprintjs/core";
import { Box, Navbar } from "components";

const Header = () => {
  return (
    <Navbar>
      <Navbar.Group>
        <Box sx={{ width: 180 - 18 }}>
          <Navbar.Heading style={{ margin: 0 }}>Akademik</Navbar.Heading>
        </Box>
        <Navbar.Divider />
        <Button minimal={true} text="Profile" />
        <Button minimal={true} text="Contact Center" />
      </Navbar.Group>
      <Navbar.Group align="right">
        <Box sx={{ ml: 2 }}>
          <Button minimal={true} icon="notifications" />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Button minimal={true} icon="user" />
        </Box>
      </Navbar.Group>
    </Navbar>
  )
}

export default Header;