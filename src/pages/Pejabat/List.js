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
            <th>NIP</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Jabatan Asing</th>
            <th>Program Studi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>{idx}</td>
              <td>0000000000000-{idx}</td>
              <td>Nama-{idx}</td>
              <td>Jabatan-{idx}</td>
              <td>Jabatan Asing-{idx}</td>
              <td>Jabatan Studi-{idx}</td>
              <td> <Button>Detail</Button> <Button>Ubah</Button></td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;