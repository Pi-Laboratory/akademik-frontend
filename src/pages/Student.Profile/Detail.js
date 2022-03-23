import { Classes, FormGroup, H3, HTMLTable, Icon, InputGroup, TextArea } from "@blueprintjs/core";
import { Box, Flex, useClient, AspectRatio } from "components";
import { joinPropsString } from "components/helper";
import { Helmet } from "react-helmet";
import { useStudent } from ".";
import moment from "moment";

export const Detail = () => {
  const client = useClient();
  const student = useStudent();

  return (
    <>
      <Helmet>
        <title>Data Diri - Pendaftaran Calon Mahasiswa Baru</title>
      </Helmet>
      <Flex sx={{ mx: 3 }}>
        <Box className={`${Classes.CARD}`} sx={{ p: 2, width: 150 }}>
          <AspectRatio
            ratio="3:4"
            className={!student ? Classes.SKELETON : ""}
          >
            <Box sx={{ width: "100%", height: "100%" }}>
              {student &&
                <>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "cover",
                    }}
                    as="img"
                    src={`${client.host.toString()}files/students/${student["id"]}/photo.jpg`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "https://via.placeholder.com/135x180?text=Tidak ditemukan";
                    }}
                  />
                </>
              }
            </Box>
          </AspectRatio>
        </Box>
        <Flex sx={{ ml: 3, flexDirection: "column" }}>
          <Box
            className={!student && Classes.SKELETON}
            sx={{ fontSize: 5, mb: 2 }}
          >
            {student && student["name"] ? student["name"] : "Nama Pengguna"}
          </Box>
          <Box
            className={!student && Classes.SKELETON}
            sx={{ fontSize: 3, mb: 2, fontWeight: "bold", color: "gray.6" }}
          >
            {student && student["nim"] ? student["nim"] : "16021103032"}
          </Box>
          <Flex sx={{ fontSize: 2, mb: 2, color: "gray.6", alignItems: "center" }}>
            <Icon icon="heart" iconSize={14} />
            <Box className={!student && Classes.SKELETON} sx={{ ml: 1 }}>
              Lahir tanggal {student && moment(student["birth_date"]).format("DD MMMM YYYY")}
            </Box>
          </Flex>
          <Flex sx={{ fontSize: 2, color: "gray.6", alignItems: "center" }}>
            <Icon icon="home" iconSize={14} />
            <Box className={!student && Classes.SKELETON} sx={{ ml: 1 }}>
              Tinggal di {student && joinPropsString(student, [
                "street",
                "neighbor.name",
                "subdistrict.name",
                "district.name",
                "city.name",
                "province.name",
              ], ", ")}
            </Box>
          </Flex>
        </Flex>
      </Flex>
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
      </Box >
    </>
  )
}