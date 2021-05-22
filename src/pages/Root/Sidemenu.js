import { Classes, H6, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { AspectRatio, Box, Divider } from "components";
import ScrollArea from "react-scrollbar";

const Sidemenu = () => {
  return (
    <Box
      sx={{
        height: "100%",
        borderRightColor: "gray.3",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        [`.${Classes.MENU}`]: {
          bg: "transparent",
          p: 0
        },
        ".scrollarea": {
          height: "100%",
        }
      }}
    >
      <ScrollArea>
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
            <MenuItem active={true} text="Dashboard" />
            <MenuItem text="Mata Kuliah" />
            <MenuItem text="Perkuliahan" />
            <MenuItem text="Wisuda" />
            <MenuItem text="Wisuda" />
            <MenuItem text="Wisuda" />
            <MenuItem text="Wisuda" />
            <MenuItem text="Wisuda" />
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
      </ScrollArea>
    </Box>
  )
}

export default Sidemenu;