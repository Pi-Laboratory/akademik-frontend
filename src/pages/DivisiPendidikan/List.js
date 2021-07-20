import { Button, ButtonGroup, Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select } from "components";
import Filter from "./Filter";
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
          <ListGroup.Item >
            <Flex>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  console.log(e.target.checked);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                  Teknik Sipil
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                  Teknik Sipil 
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box  sx={{ width: 295, mr: 3, mt:10, }}>
                  Konstruksi Bangunan
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-IV
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
              </Box>
              
            </Flex>

            {/* Pembatas Teknik Elektro */}

            <Flex sx={{mt:20}}>  
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  console.log(e.target.checked);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>

              <Box sx={{ width: 295, mr: 3,}}>
                <Box>
                  Teknik Elektro
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                  Teknik Informatika
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box  sx={{ width: 295, mr: 3, mt:10, }}>
                  Teknik Komputer
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box  sx={{ width: 295, mr: 3, mt:10, }}>
                  Teknik Listrik
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box  sx={{ width: 295, mr: 3, mt:10, }}>
                  Teknik Listrik
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                 D-IV
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-IV
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
              </Box>
              
            </Flex>

            {/* Pembatas Teknik Mesin */}

            <Flex sx={{mt:20}}>  
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  console.log(e.target.checked);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>

              <Box sx={{ width: 295, mr: 3,}}>
                <Box>
                  Teknik Mesin
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                  Teknik Mesin
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
              </Box>
              
            </Flex>
            
            {/* Pembatas akuntansi */}

            <Flex sx={{mt:20}}>  
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  console.log(e.target.checked);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>

              <Box sx={{ width: 295, mr: 3,}}>
                <Box>
                  Akuntansi
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                  Perpajakan
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box  sx={{ width: 295, mr: 3, mt:10, }}>
                  Akuntansi
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                 D-IV
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
              </Box>
              
            </Flex>

            {/* pembatas Administrasi Bisnis */}

            <Flex sx={{mt:20}}>  
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  console.log(e.target.checked);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>

              <Box sx={{ width: 295, mr: 3,}}>
                <Box>
                  Administrasi Bisnis
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                  Administrasi Bisnis
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box  sx={{ width: 295, mr: 3, mt:10, }}>
                  Manajemen Bisnis
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-IV
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
              </Box>
              
            </Flex>

            {/* pembatas pariwisata */}

            <Flex sx={{mt:20}}>  
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  console.log(e.target.checked);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>

              <Box sx={{ width: 295, mr: 3,}}>
                <Box>
                  Pariwisata
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                  Perhotelan
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box  sx={{ width: 295, mr: 3, mt:10, }}>
                  Usaha Perjalan Wisata
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box  sx={{ width: 295, mr: 3, mt:10, }}>
                  Ekowisata Bawah Laut
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
              </Box>

              <Box sx={{ width: 295, mr: 3 }}>
                <Box>
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
                <Box sx={{ width: 295, mr: 3, mt:10, }} >
                 D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
                </Box>
              </Box>
              
            </Flex>
            

          </ListGroup.Item>
   
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