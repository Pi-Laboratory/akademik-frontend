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
            <th>Nama Program Studi</th>
            <th>Jenjang Studi</th>
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
              <td> <Button style={{ color: Colors.BLUE3 }} >Detail</Button> <Button style={{ color: Colors.RED3 }} >Ubah</Button> -{idx}</td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;