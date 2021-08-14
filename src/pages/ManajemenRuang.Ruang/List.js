import { Button, ButtonGroup, Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select } from "components";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { useReducer } from "react";

function selectedItemReducer(state, action) {
  switch (action.type) {
    case "toggle":
      console.log(state);
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
                label="Pengelola"
                options={[
                  { label: "Politeknik Negeri Manado", value: 0 },
                  { label: "Teknik Elektro", value: 0 },
                  { label: "Teknik Mesin", value: 1 },
                  { label: "Teknik Sipil", value: 2 },
                  { label: "PLN", value: 3 },
                  { label: "Teknik LIstrik", value: 3 },
                ]}
              />
           
              <Select
                minimal={true}
                label="Tipe Gedung"
                options={[
                  { label: "Lab", value: 0 },
                  { label: "Bengkel", value: 0 },
                  { label: "Gedung", value: 1 },
                ]}
              />
               <Select
                minimal={true}
                label="Status Kelayakan"
                options={[
                  { label: "Layak", value: 0 },
                  { label: "Tidak Layak", value: 0 },
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
                  Lab
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Tipe Gedung
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  <Link to={`/manajemen-ruang/ruang/${idx}`}>
                  Lab Komputer
                  </Link>
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  LBKM01
                </Box>
                
              </Box>
             
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                100 orang
                </Box>
                <Box sx={{ color: "gray.5" }}>
                 Kapasitas
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                    Layak
                </Box>
               
              </Box>
            
              <Box sx={{ flexGrow: 1 }}>
                Teknik Elektro
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