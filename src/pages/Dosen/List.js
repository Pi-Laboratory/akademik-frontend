import { Checkbox, HTMLTable } from "@blueprintjs/core";
import { Box } from "components";
import Filter from "pages/Users/Filter";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <Box sx={{ mt: 3, px: 2 }}>
      <Filter />
      <Box as={HTMLTable} interactive={true} sx={{ width: "100%" }}>
        <thead>
          <tr>
            <th><Checkbox /></th>
            <th>NIP</th>
            <th>NIDN</th>
            <th>Nama</th>
            <th>Gelar Depan</th>
            <th>Gelar Belakang</th>
            <th>Prodi</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>
                <Link to={`dosen/${idx}`}>
                  NIP-{idx}
                </Link>
              </td>
              <td>NIDN-{idx}</td>
              <td>Nama-{idx}</td>
              <td>Gelard-{idx}</td>
              <td>Gelarb-{idx}</td>
              <td>prodi-{idx}</td>
              <td>status-{idx}</td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  )
}

export default List;