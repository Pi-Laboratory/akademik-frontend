import { Button, ButtonGroup, Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select } from "components";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { useReducer } from "react";

function selectedItemReducer(state, action) {
  switch (action.type) {
    case "toggle":
      if (action.data.value) {
        return selectedItemReducer(state, {
          type: "add",
          data: action.data
        });
      } else {
        return selectedItemReducer(state, {
          type: "remove",
          data: action.data
        });
      }
    case "add":
      return [...state, action.data.name];
    case "remove":
      return [...state.filter(item => item !== action.data.name)];
    default: return state;
  }
}

const List = () => {
  const [selectedItem, dispatchSelectedItem] = useReducer(selectedItemReducer, []);
  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Filter selectedItem={selectedItem} />
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
              <Checkbox
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexShrink: 0 }}>

              <Select
                minimal={true}
                label="Jabatan"
                options={[
                  { label: "Pengajar", value: 0 },
                  { label: "Staff", value: 0 },
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
          <ListGroup.Item key={idx}>
            <Flex>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      name: idx,
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>
              <Box sx={{ fontWeight: "bold", width: "15%", flexShrink: 0 }}>
                {Math.round(Math.random() * 12093)}
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  <Link to={`staff-dan-pengajar/${idx}`}>
                    Prof. Dr. Imanuel Pundoko, S.Th.
                  </Link>
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  {`74398734${Math.round(Math.random() * 8364872343)}`}
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  NIP
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  197807102008121003
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  KTP
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  -
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  Dosen
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jabatan
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  Teknik Elektro
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
              </Box>
            </Flex>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Flex sx={{ my: 3, justifyContent: "center" }}>
        <Button minimal={true} icon="chevron-left" text="Previous" />
        <ButtonGroup>
          <Button text="1" active={true} />
          <Button text="2" />
          <Button text="3" />
        </ButtonGroup>
        <Button minimal={true} text="Next" rightIcon="chevron-right" />
      </Flex>
    </Box >
  )
}

export default List;