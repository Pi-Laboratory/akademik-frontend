import { Checkbox, HTMLTable } from "@blueprintjs/core";
import { Box, Container } from "components";

const List = () => {
  return (
    <Container sx={{ mt: 3, px: 2 }}>
      <Box as={HTMLTable} interactive={true} sx={{ width: "100%" }}>
        <thead>
        <tr>
            <th rowspan="2"><Checkbox /></th>
            <th rowspan="2">Id</th>
            <th colspan="2" style={{textAlign: "center"}} >Gedung</th>
            <th colspan="2" style={{textAlign: "center"}} >Pengelola</th>
            <th rowspan="2">Aksi</th>
          </tr>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>Tingkat</th>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>{idx}</td>
              <td>kode-{idx}</td>
              <td>nama-{idx}</td>
              <td>tingkat-{idx}</td>
              <td>nama-{idx}</td>
              <td><button>Detail</button><button>Ubah</button><button>Hapus</button></td>

            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;