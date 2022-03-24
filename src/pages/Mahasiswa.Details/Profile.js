import { Classes, H3, HTMLTable } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { joinPropsString } from "components/helper";
import moment from "moment";
import { useStudent } from ".";

const Profile = () => {
  const student = useStudent();

  return (
    <>
      <Box sx={{ mt: 4, mx: 3 }}>
        <Flex sx={{ mx: -2 }}>
          <Box sx={{ width: "50%", px: 2 }}>
            <Box as={H3} sx={{ mb: 3 }}>Informasi Dasar</Box>
            <Box className={Classes.CARD} sx={{ p: 0 }}>
              <HTMLTable striped={true} className={!student && Classes.SKELETON} style={{ width: "100%" }}>
                <tbody>
                  {[
                    ["Email", student && student["email"]],
                    ["Nomor Telephone", student && student["phone_number"]],
                    [
                      "Alamat", student && joinPropsString(student, [
                        "street",
                        "neighbor.name",
                        "subdistrict.name",
                        "district.name",
                        "city.name",
                        "province.name",
                        "postal_code",
                      ], ", ")
                    ],
                    ["Agama", student && student["religion"]],
                  ].map((val) => {
                    return (
                      <tr key={val[0]}>
                        <td>{val[0]}</td>
                        <td>{val[1]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </HTMLTable>
            </Box>
          </Box>
          <Box sx={{ width: "50%", px: 2 }}>
            <Box as={H3} sx={{ mb: 3 }}>Informasi Akademik</Box>
            <Box className={Classes.CARD} sx={{ p: 0 }}>
              <HTMLTable striped={true} className={!student && Classes.SKELETON} style={{ width: "100%" }}>
                <tbody>
                  {[
                    ["Nomor Induk Mahasiswa", student && student["nim"]],
                    ["Angkatan", student && student["generation"]],
                    ["Program Studi", student && student["study_program"]["name"]],
                    ["Jurusan", student && student["study_program"]["major"]["name"]],
                  ].map((val) => {
                    return (
                      <tr key={val[0]}>
                        <td>{val[0]}</td>
                        <td>{val[1]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </HTMLTable>
            </Box>
          </Box>
        </Flex>
        <Flex sx={{ flexWrap: "wrap", mx: -2 }}>
          {[
            ["father", "Ayah"],
            ["mother", "Ibu"],
            ["trustee", "Wali"],
          ].map((value) => (
            <Box sx={{ width: "50%", px: 2, my: 3 }}>
              <Box as={H3} sx={{ mb: 3 }}>Informasi {value[1]}</Box>
              <Box className={Classes.CARD} sx={{ p: 0 }}>
                <HTMLTable striped={true} className={!student && Classes.SKELETON} style={{ width: "100%" }}>
                  <tbody>
                    {
                      [
                        ["Nama", student && student[`${value[0]}_name`]],
                        ["Tanggal Lahir", student && student[`${value[0]}_birth_name`] ? moment(student[`${value[0]}_birth_name`]).format("DD MMMM YYYY") : ""],
                        ["Pendidikan", student && student[`${value[0]}_education`]],
                        ["Pendidikan Terakhir", student && student[`${value[0]}_recent_education`]],
                        ["Pekerjaan", student && student[`${value[0]}_occupation`]],
                      ].map((val) => {
                        return (
                          <tr key={val[0]} className={!student && Classes.SKELETON}>
                            <td>{student ? val[0] : "Loading"}</td>
                            <td>{student ? val[1] : "Loading"}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </HTMLTable>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  )
}

export default Profile;