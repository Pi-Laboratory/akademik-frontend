import { Classes, HTMLTable } from "@blueprintjs/core";
import { AspectRatio, Box, Divider, Flex, useClient } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useEmployee } from "./hoc";

const Profile = () => {
  const employee = useEmployee();

  return (
    <Flex sx={{ px: 3 }}>
      <Box sx={{ py: 4, flexGrow: 1 }}>
        <h4 className={Classes.HEADING}>Ringkasan</h4>
        <HTMLTable striped={true}>
          <tbody>
            {[
              ["NIP", employee && employee["nip"]],
              ["Nama Lengkap", employee && `${employee["front_degree"] || ""}${employee["name"]}${employee["back_degree"] || ""}`],
              ["NIK", employee && employee["id_number"]],
              ["Tempat Lahir", employee && employee["birth_city"]],
              ["Tanggal Lahir", employee && employee["birth_date"]],
              ["Jenis Kelamin", employee && employee["gender"]],
              ["Golongan Darah", employee && employee["blood_type"]],
              ["Agama", employee && employee["religion"]],
              ["Status Nikah", employee && employee["merried_status"]],
              ["Alamat", employee && employee["home_address"]],
              ["Negara", employee && employee["country"]],
              ["Kabupaten/Kota", employee && employee["city"]],
              ["Nomor Telepon", employee && employee["phone_number"]]
            ].map((value, idx) => (
              <tr key={value[0]}>
                <td>
                  <Box
                    className={employee ? "" : Classes.SKELETON}
                    sx={{ color: "gray.4" }}
                  >
                    {value[0]}
                  </Box>
                </td>
                <td>
                  <Box className={employee ? "" : Classes.SKELETON}>
                    {value[1]}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      </Box>
    </Flex>
  )
}

export default Profile;