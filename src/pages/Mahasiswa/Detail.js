import { Classes, H3 } from "@blueprintjs/core";
import { Box, Divider, AspectRatio, Flex } from "components";

export const Detail = () => {
  return (
    <>
      <Flex sx={{ px: 3, mb: 3 }}>
        <Box className={`${Classes.CARD}`} sx={{ p: 3, mb: 2, width: 250, flexShrink: 0 }}>
          <AspectRatio ratio="1:1">
            <Box
              as="img"
              sx={{ borderRadius: 4, width: "100%", height: "100%", display: "block" }}
              src="https://source.unsplash.com/random/180x180"
            />
          </AspectRatio>
        </Box>
        <Box sx={{ px: 3 }}>
          <Box as="h1">Imanuel Pundoko</Box>
          <Flex
            sx={{
              pt: 2,
              ">div": {
                pr: 4,
                ".title": {
                  fontSize: 3,
                  fontWeight: "bold"
                },
                ".subtitle": {
                  fontSize: 0
                }
              }
            }}
          >
            <div>
              <div className="title">3.67</div>
              <div className="subtitle">IP Kumulatif</div>
            </div>
            <div>
              <div className="title">254</div>
              <div className="subtitle">SKS</div>
            </div>
            <div>
              <div className="title">13</div>
              <div className="subtitle">Matakuliah</div>
            </div>
          </Flex>
          {[
            ["Tanggal Lahir", "21 Juni 1968"],
            ["Kota Tempat Lahir", "Banjarmasin"],
            ["Jenis Kelamin", "Laki-laki"],
            ["Telepon", "0852-9948-2331"],
          ].map((item, idx) => (
            <Flex key={idx} sx={{ mt: 3 }}>
              <Box sx={{ width: "50%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
                <span>{item[0]}</span>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <span>{item[1]}</span>
              </Box>
            </Flex>
          ))}
        </Box>
      </Flex>
      <Divider sx={{ mt: 0, mb: 4 }} />
      <Flex sx={{ ml: 3 }}>
        <Box sx={{
          flexGrow: 1
        }}>
          <Box as={H3}>Informasi Ayah</Box>
          {[
            ["Tanggal Lahir", "21 Juni 1968"],
            ["Kota Tempat Lahir", "Banjarmasin"],
            ["Jenis Kelamin", "Laki-laki"],
            ["Telepon", "0852-9948-2331"],
          ].map((item, idx) => (
            <Flex key={idx} sx={{ mt: 3 }}>
              <Box sx={{ width: "50%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
                <span>{item[0]}</span>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <span>{item[1]}</span>
              </Box>
            </Flex>
          ))}
        </Box>
        <Box sx={{
          flexGrow: 1
        }}>
          <Box as={H3}>Informasi Ibu</Box>
          {[
            ["Tanggal Lahir", "21 Juni 1968"],
            ["Kota Tempat Lahir", "Banjarmasin"],
            ["Jenis Kelamin", "Laki-laki"],
            ["Telepon", "0852-9948-2331"],
          ].map((item, idx) => (
            <Flex key={idx} sx={{ mt: 3 }}>
              <Box sx={{ width: "50%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
                <span>{item[0]}</span>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <span>{item[1]}</span>
              </Box>
            </Flex>
          ))}
        </Box>
      </Flex>
    </>
  )
}