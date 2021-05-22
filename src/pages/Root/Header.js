import { Button, Classes, Icon, InputGroup, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { Box, Navbar } from "components";

const Header = () => {
  return (
    <Navbar>
      <Navbar.Group>
        <Box sx={{ width: 180 - 18 }}>
          <Navbar.Heading style={{ margin: 0 }}>Akademik</Navbar.Heading>
        </Box>
        <Navbar.Divider />
        <Box sx={{mr: 2}}>
          <InputGroup
            placeholder="Cari"
            rightElement={<Button outlined={true} icon="slash" />}
          />
        </Box>
        <Button minimal={true} text="Profile" />
        <Button minimal={true} text="Contact Center" />
      </Navbar.Group>
      <Navbar.Group>
      </Navbar.Group>
      <Navbar.Group align="right">
        <Box sx={{ ml: 2 }}>
          <Popover2
            placement="bottom-end"
            content={(
              <Box sx={{ p: 2 }}>
                There is no notification
              </Box>
            )}
          >
            <Button minimal={true} icon="notifications" />
          </Popover2>
        </Box>
        <Box sx={{ ml: 2 }}>
          <Popover2
            placement="bottom-end"
            content={(
              <Menu>
                <MenuItem text="Signed in as Admin" />
                <MenuDivider />
                <MenuItem text="Settings" />
                <MenuItem text="Help" />
                <MenuDivider />
                <MenuItem intent="danger" icon="log-out" text="Logout" />
              </Menu>
            )}
          >
            <Button minimal={true} icon="user" />
          </Popover2>
        </Box>
      </Navbar.Group>
    </Navbar>
  )
}

export default Header;