import { Classes, H3 } from "@blueprintjs/core";
import { AspectRatio, Box, Divider, Flex } from "components";

const Layout = () => {
  return (
    <Flex sx={{ px: 3 }}>
      <Box sx={{ py: 4, flexGrow: 1 }}>
        <Box as={H3}>Informasi Staff</Box>
        {[
          ["NIP", "197807102008121003"],
          ["NIDN", "197807102008121003"],
          ["Nama Lengkap", "ADRIYAN WAROKKA"],
          ["Gelar Depan", "-"],
          ["Gelar Belakang", "ST.,M.ENG"],
          ["NIK", "72239503948503"],
          ["Tempat Lahir", "Banjarmasin"],
          ["Tanggal Lahir", "21 Juni 1968"],
          ["Kartu Pegawai", "-"],
          ["Jenis Kelamin", "Perempuan"],
          ["Golongan Darah", "O"],
          ["Agama", "-"],
          ["Status Nikah", "-"],
          ["Alamat"],
          ["Negara", "Indonesia"],
          ["Provinsi", "Sulawesi Utara"],
          ["Kabupaten/Kota", "Manado"],
          ["Desa/Kelurahan", "-"],
          ["Nomor Telepon", "-"],
          ["Email", "-"],
          ["Jenis Pegawai", "Pengajar"],
        ].map((item, idx) => (
          <Flex key={idx} sx={{ mt: 3 }}>
            <Box sx={{ width: "40%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
              <span>{item[0]}</span>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <span>{item[1]}</span>
            </Box>
          </Flex>
        ))}
        <Box as={H3} sx={{ mt: 4 }}>Informasi Pejabat</Box>
        {[
          ["Jabatan", "-"],
          ["Program Studi", "-"],
        ].map((item, idx) => (
          <Flex key={idx} sx={{ mt: 3 }}>
            <Box sx={{ width: "40%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
              <span>{item[0]}</span>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <span>{item[1]}</span>
            </Box>
          </Flex>
        ))}
      </Box>
      <Divider vertical={true}/>
      <Box sx={{ pt: 4, px: 2, width: 350, flexShrink: 0 }}>
        <Box className={`${Classes.CARD}`} sx={{ p: 2, mb: 2, width: 250 }}>
          <AspectRatio ratio="1:1">
            <Box
              as="img"
              sx={{ width: "100%", height: "100%", display: "block" }}
              src="https://source.unsplash.com/random/180x180"
            />
          </AspectRatio>
        </Box>
        <Box sx={{ fontSize: 3, mb: 2 }}>
          ADRIYAN WAROKKA, ST.,M.ENG
        </Box>
        <Box sx={{ fontWeight: "bold", color: "gray.6" }}>
          197807102008121003
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout;