import { Checkbox, HTMLTable } from "@blueprintjs/core";
import { Box, Container } from "components";

const List = () => {
  return (
    <Container sx={{ mt: 3, px: 2 }}>
      <Box as={HTMLTable} interactive={true} sx={{ width: "100%" }}>
        <thead>
        <tr>
        <th><Checkbox /></th>
            <th>Id</th>
            <th>NIP</th>
            <th>NIDN</th>
            <th>Nama</th>
            <th>Gelar Depan</th>
            <th>Gelar Belakang</th>
            <th>Prodi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>{idx}</td>
              <td>NIP-{idx}</td>
              <td>NIDN-{idx}</td>
              <td>Nama-{idx}</td>
              <td>Gelard-{idx}</td>
              <td>Gelarb-{idx}</td>
              <td>prodi-{idx}</td>
              <td>status-{idx}</td>
              <td><button>Detail</button><button>Ubah</button><button>Hapus</button></td>

            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;