import ScrollArea from "react-scrollbar";
import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Box } from "components";
import { useNav } from "./hoc";
import { useLocation } from "react-router";

const Sidemenu = () => {
  const navigation = useNav("/");
  const location = useLocation();
  return (
    <Box as={ScrollArea}
      sx={{
        position: "sticky",
        top: 50,
        maxHeight: "calc(100vh - 50px)",
        [`.${Classes.MENU}`]: {
          bg: "transparent",
          p: 0
        },
        ".scrollarea": {
          height: "100%",
        }
      }}
    >
      <Box sx={{
        py: 4,
      }}>
        <Menu>
          <MenuDivider title="Main Menu" />
          {
            navigation.items
            && navigation.items.map((item) => {
              let active = false;
              if (item.exact) {
                active = location.pathname === item.path;
              } else {
                active = location.pathname.indexOf(item.path) === 0;
              }
              if (item.hide) {
                return (null);
              }
              return (
                <MenuItem
                  key={item.path}
                  active={active}
                  text={item.text}
                  title={item.title}
                  icon={item.icon}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigation.go(item.path);
                  }}
                />
              )
            })
          }
        </Menu>
      </Box>
    </Box>
  )
}

export default Sidemenu;