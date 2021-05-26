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
            <th rowspan="2">Nama Kurikulum</th>
            <th rowspan="2">Tahun</th>
            <th colspan="2" style={{textAlign: "center"}} >Masa Studi (Semester)</th>
            <th colspan="3" style={{textAlign: "center"}} >Evaluasi</th>
            <th>Mata Kuliah</th>
            <th rowspan="2">Aksi</th>
          </tr>
          <tr>
            <th>Ideal</th>
            <th>Maks</th>
            <th>IPK min</th>
            <th>IPK min percobaan</th>
            <th>Maks Nilai D</th>
          </tr>
        </thead>
        <tbody>
          {Array(25).fill(0).map((_, idx) => (
            <tr key={idx}>
              <td><Checkbox /></td>
              <td>{idx}</td>
              <td>nama-{idx}</td>
              <td>tahun-{idx}</td>
              <td>ideal-{idx}</td>
              <td>maks-{idx}</td>
              <td>ipkmin-{idx}</td>
              <td>ipkminc-{idx}</td>
              <td>maksnilaid-{idx}</td>
              <td>matakuliah-{idx}</td>
              <td><button>Detail</button><button>Ubah</button><button>Hapus</button></td>

            </tr>
          ))}
        </tbody>
      </Box>
    </Container>
  )
}

export default List;