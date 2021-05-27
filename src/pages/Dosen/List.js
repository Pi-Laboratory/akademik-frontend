import { Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select } from "components";
import Filter from "./Filter";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Filter />
      </Box>
      <ListGroup sx={{
        width: "100%",
        [`.${Classes.CHECKBOX}`]: {
          m: 0
        }
      }}>
        <ListGroup.Header>
          <Flex sx={{ alignItems: "center" }}>
            <Box sx={{ width: 40, flexShrink: 0, }}>
              <Checkbox />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexShrink: 0 }}>
              <Select
                minimal={true}
                label="Status"
                options={[
                  { label: "Aktif", value: true },
                  { label: "Tidak Aktif", value: false }
                ]}
              />
              <Select
                minimal={true}
                label="Program Studi"
                options={[
                  { label: "Teologi", value: 0 },
                  { label: "Teknik Elektro", value: 0 },
                  { label: "Teknik Arsitektur", value: 1 },
                  { label: "Akuntansi", value: 2 },
                  { label: "Teknik Sipil", value: 3 },
                  { label: "Bahasa Inggris", value: 3 },
                ]}
              />
            </Box>
          </Flex>
        </ListGroup.Header>
        {Array(25).fill(0).map((_, idx) => (
          <ListGroup.Item>
            <Flex>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox />
              </Box>
              <Box sx={{ fontWeight: "bold", width: "15%", flexShrink: 0 }}>
                {Math.round(Math.random() * 12093)}
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  <Link to={`dosen/${idx}`}>
                    Prof. Dr. Imanuel Pundoko, S.Th.
                  </Link>
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  {`74398734${Math.round(Math.random() * 8364872343)}`}
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                Teknik Elektro
              </Box>
            </Flex>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Box >
  )
}

export default List;