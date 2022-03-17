import { Classes, FormGroup, H3, Icon, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useClient, AspectRatio } from "components";
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
                    src={`${client.host.toString()}files/students/${student["student"]["id"]}/photo.jpg`}
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
            {student && student["student"]["name"] ? student["student"]["name"] : "Nama Pengguna"}
          </Box>
          <Box
            className={!student && Classes.SKELETON}
            sx={{ fontSize: 3, mb: 2, fontWeight: "bold", color: "gray.6" }}
          >
            {student && student["student"]["email"] ? student["student"]["email"] : "email@domain.com"}
          </Box>
          <Flex sx={{ fontSize: 2, mb: 2, color: "gray.6", alignItems: "center" }}>
            <Icon icon="heart" iconSize={14} />
            <Box className={!student && Classes.SKELETON} sx={{ ml: 1 }}>
              Lahir tanggal {student && moment(student["student"]["birth_date"]).format("DD MMMM YYYY")}
            </Box>
          </Flex>
          <Flex sx={{ fontSize: 2, color: "gray.6", alignItems: "center" }}>
            <Icon icon="home" iconSize={14} />
            <Box className={!student && Classes.SKELETON} sx={{ ml: 1 }}>
              Tinggal di {student && student["student"]["origin_address"]}
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Box sx={{ mt: 4, mx: 3 }}>
        <Flex sx={{ mx: -2 }}>
          <Box sx={{ width: "50%", px: 2 }}>
            <Box as={H3} sx={{ mb: 3 }}>Informasi Pendaftaran</Box>
            {[
              ["Nomor Induk Siswa Nasional", student && student["nisn"]],
              ["Asal Sekolah", student && student["school_name"]],
              ["Alamat Sekolah", student && student["school_address"]],
            ].map((val) => (
              <Box className={!student && Classes.SKELETON}>
                <FormGroup
                  label={val[0]}
                >
                  <InputGroup
                    readOnly={true}
                    value={val[1]}
                  />
                </FormGroup>
              </Box>
            ))}
          </Box>
          <Box sx={{ width: "50%", px: 2 }}>
            <Box as={H3} sx={{ mb: 3 }}>Pilihan Program Studi</Box>
            {[
              ["Program Studi Pertama", student && student["study_program_1"]],
              ["Program Studi Kedua", student && student["study_program_2"]],
            ].map((val) => {
              console.log(val[1]);
              const { name, major } = val[1] || {};
              return (
                <Box
                  key={val[0]}
                  className={!student && Classes.SKELETON}
                >
                  <FormGroup
                    label={val[0]}
                  >
                    <InputGroup
                      readOnly={true}
                      value={`${name}, ${major && major["name"]}`}
                    />
                  </FormGroup>
                </Box>
              )
            })}
          </Box>
        </Flex>
      </Box>
    </>
  )
}