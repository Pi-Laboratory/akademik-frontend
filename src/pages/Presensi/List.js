import { Checkbox, HTMLTable, Button, Colors, } from "@blueprintjs/core";

import { Box, Container } from "components";

const List = () => {
  return (
    <Container sx={{ mt: 3, px: 2 }}>
      <Box as={HTMLTable} interactive={true} sx={{ width: "100%" }}>
        <thead>
          <tr>
            <th><Checkbox /></th>
            <th>No</th>
            <th>Mata Kuliah</th>
            <th>Kelas</th>
            <th>Dosen</th>
            <th>Jumlah Peserta</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>{idx}</td>
              <td>Mata Kuliah-{idx}</td>
              <td>Kelas-{idx}</td>
              <td>Ddsen-{idx}</td>
              <td>Jumlah Peserta-{idx}</td>
              <td> <Button>Detail</Button> <Button>Ubah</Button></td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;