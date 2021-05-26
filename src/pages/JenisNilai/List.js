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
            <th>Kode Nilai</th>
            <th>Bobot</th>
            <th>Kelompok Nilai</th>
            <th>Bobot Kelompok</th>
            <th>Rentang Nilai</th>
            <th>Label Asing</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>{idx}</td>
              <td>Kode Nilai-{idx}</td>
              <td>Bobot-{idx}</td>
              <td>Kelompok Nilai-{idx}</td>
              <td>Bobot Kelompok-{idx}</td>
              <td>Rentang Nilai -{idx}</td>
              <td>Label Asing-{idx}</td>
              <td> <Button>Detail</Button> <Button>Ubah</Button></td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;