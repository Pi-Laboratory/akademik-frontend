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
            <th>Predikat</th>
            <th>Ipk</th>
            <th>Masa Studi(Semester)</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>{idx}</td>
              <td>Predikat-{idx}</td>
              <td>Ipk-{idx}</td>
              <td>Masa Studi(Semester)-{idx}</td>
              <td> <Button>Ubah</Button> <Button>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;