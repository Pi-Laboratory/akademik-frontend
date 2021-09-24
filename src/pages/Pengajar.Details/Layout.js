import { Classes, H3, HTMLTable } from "@blueprintjs/core";
import { AspectRatio, Box, Divider, Flex, useClient } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["lecturers"].get(params.id);

        setItem(res);

      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, params.id]);

  return (
    <Flex sx={{ px: 3 }}>
      <Box sx={{ py: 4, flexGrow: 1 }}>
        <h4 className={Classes.HEADING}>Ringkasan</h4>
        {item &&
          <HTMLTable striped={true}>
            <tbody>
              {[
                ["NIP", item["nip"]],
                ["NIDN", item["nidn"]],
                ["Nama Lengkap", `${item["front_degree"]}${item["name"]}${item["back_degree"]}`],
                ["NIK", item["nik"]],
                ["Tempat Lahir", item["birth_city"]],
                ["Tanggal Lahir", item["birth_date"]],
                ["Jenis Kelamin", item["gender"]],
                ["Golongan Darah", item["blood_type"]],
                ["Agama", item["religion"]],
                ["Status Nikah", item["merried_status"]],
                ["Alamat", item["home_address"]],
                ["Negara", item["country"]],
                ["Kabupaten/Kota", item["city"]],
                ["Nomor Telepon", item["phone_number"]],
                ["Email", item["email"]],
                ["Jenis Pegawai", (["Pengajar", "Staff"])[item["status"]]],
              ].map((value, idx) => (
                <tr>
                  <td>
                    <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                  </td>
                  <td>{value[1]}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>}
        <Box as={H3} sx={{ mt: 4 }}>Informasi Pejabat</Box>
        {[
          ["Jabatan", "-"],
          ["Program Studi", "-"],
        ].map((item, idx) => (
          <Flex key={idx} sx={{ mt: 3 }}>
            <Box sx={{ width: "40%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
              <span>{item[0]}</span>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <span>{item[1]}</span>
            </Box>
          </Flex>
        ))}
      </Box>
      <Divider vertical={true} />
      <Box sx={{ pt: 4, px: 2, width: 350, flexShrink: 0 }}>
        <Box className={`${Classes.CARD}`} sx={{ p: 2, mb: 2, width: 250 }}>
          <AspectRatio ratio="1:1">
            <Box
              as="img"
              sx={{ width: "100%", height: "100%", display: "block" }}
              src="https://source.unsplash.com/random/180x180"
            />
          </AspectRatio>
        </Box>
        <Box sx={{ fontSize: 3, mb: 2 }}>
          ADRIYAN WAROKKA, ST.,M.ENG
        </Box>
        <Box sx={{ fontWeight: "bold", color: "gray.6" }}>
          197807102008121003
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout;