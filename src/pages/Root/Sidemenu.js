import ScrollArea from "react-scrollbar";
import { Classes, H6, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { AspectRatio, Box, Divider } from "components";
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
        <Box sx={{ px: 2 }}>
          <Box className={`${Classes.CARD}`} sx={{ p: 2 }}>
            <AspectRatio ratio="1:1">
              <Box
                as="img"
                sx={{ width: "100%", height: "100%", display: "block" }}
                src="https://source.unsplash.com/random/180x180"
              />
            </AspectRatio>
          </Box>
          <Box sx={{ mt: 3, textAlign: "center", fontWeight: "bold" }}>I. Pundoko</Box>
        </Box>
        <Divider />
        <Menu>
          <MenuDivider title="Main Menu" />
          {
            navigation.items
            && navigation.items.map((item) => {
              console.log(item)
              let active = false;
              if (item.exact) {
                active = location.pathname === item.path;
              } else {
                active = location.pathname.indexOf(item.path) === 0;
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
        <Divider />
        <Box sx={{ color: "gray.5" }}>
          <Box sx={{ px: 2, mb: 3 }}>
            <Box as={H6}>NIM</Box>
            <Box>16021103032</Box>
          </Box>
          <Box sx={{ px: 2, mb: 3 }}>
            <Box as={H6}>Email</Box>
            <Box>ilomon10@gmail.com</Box>
          </Box>
          <Box sx={{ px: 2, mb: 3 }}>
            <Box as={H6}>Telp</Box>
            <Box>+62 852-9948-2331</Box>
          </Box>
          <Box className={`${Classes.CARD}`} sx={{ p: 0, mx: 2 }}>
            <Box sx={{ p: 2 }}>
              <Box as={H6}>Total SKS</Box>
              <Box sx={{ fontSize: 4, textAlign: "right" }}>144</Box>
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box sx={{ p: 2 }}>
              <Box as={H6}>IPK</Box>
              <Box sx={{ fontSize: 4, textAlign: "right" }}>3.57</Box>
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box sx={{ p: 2 }}>
              <Box as={H6}>Total Matakuliah</Box>
              <Box sx={{ fontSize: 4, textAlign: "right" }}>24</Box>
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box sx={{ p: 2 }}>
              <Box as={H6}>Semester</Box>
              <Box sx={{ fontSize: 4, textAlign: "right" }}>13</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidemenu;