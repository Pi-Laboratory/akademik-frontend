import { Checkbox, HTMLTable, Button } from "@blueprintjs/core";

import { Box, Container } from "components";

const List = () => {
  return (
    <Container sx={{ mt: 3, px: 2 }}>
      <Box as={HTMLTable} interactive={true} sx={{ width: "100%" }}>
        <thead>
          <tr>
            <th><Checkbox /></th>
            <th>No</th>
            <th>Nama Program Studi</th>
            <th>Jenjang Studi</th>
            <th>Nama Jurusan</th>
            <th>Akreditasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>{idx}</td>
              <td>Nama Program Studi-{idx}</td>
              <td>Jenjang Studi-{idx}</td>
              <td>Nama Jurusan-{idx}</td>
              <td> A -{idx}</td>
              <td> <Button>Detail</Button> <Button>Ubah</Button></td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;