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
                label="Prodi"
                options={[
                  { label: "Teknik Sipil (D3)", value: 0 },
                  { label: "Konstruksi Bangunan (D4)", value: 1 },
                  { label: "Teknik Informatika (D4)", value: 2 },
                  { label: "Teknik Komputer (D3)", value: 3 },
                  { label: "Teknik Listrik (D3)", value: 4 },
                  { label: "Teknik Listrik (D4)", value: 5 },
                  { label: "Teknik Mesin (D3)", value: 6 },
                  { label: "Perpajakan (D4)", value: 7 },
                  { label: "Akuntansi (D3)", value: 8 },
                  { label: "Manajemen Bisnis (D4)", value: 9 },
                  { label: "Perhotelan (D3)", value: 10 },
                  { label: "Usaha Perjalanan Wisata (D3)", value: 11 },
                  { label: "Ekowisata Bawah Laut (D3)", value: 12 },
                ]}
              />
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Select
                minimal={true}
                label="Jurusan"
                options={[
                  { label: "Teknik Elektro", value: 0 },
                  { label: "Teknik Sipil", value: 1 },
                  { label: "Teknik Mesin", value: 2 },
                  { label: "Akuntansi", value: 3 },
                  { label: "Administrasi Bisnis", value: 4 },
                  { label: "Pariwisata", value: 5 },

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
                  console.log(e.target.checked);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      name: idx,
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>


              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  Teknik Elektro
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  Teknik Komputer
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  D3
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
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