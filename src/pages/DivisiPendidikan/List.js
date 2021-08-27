import { Checkbox, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient } from "components";
import Filter from "./Filter";
import { useEffect, useReducer, useState } from "react";
import { Pagination } from "components/Pagination";

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
  const client = useClient();
  const [selectedItem, dispatchSelectedItem] = useReducer(selectedItemReducer, []);
  const [list, setList] = useState(null);
  const [paging, setPaging] = useState({
    total: null,
    limit: null,
    skip: 0,
  });

  useEffect(() => {
    const fetch = async () => {
      setList(null);
      try {
        const res = await client["study-programs"].find({
          query: {
            // $select: ["id", "name", "major_id", "createdAt"],
            $skip: paging.skip
          }
        });
        console.log(res);
        setList(res.data);
        setPaging({
          total: res.total,
          limit: res.limit,
          skip: res.skip
        });
      } catch (err) {
        console.error(err);
        setList([]);
      }
    }
    fetch();
  }, [client, paging.skip]);

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
              <Select
                minimal={true}
                label="Program Studi"
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
              <Select
                minimal={true}
                label="Jenjang Studi"
                options={[
                  { label: "D-III", value: 0 },
                  { label: "D-IV", value: 1 },
                ]}
              />
            </Box>
          </Flex>
        </ListGroup.Header>
        {list === null &&
          <Box sx={{ p: 2 }}>
            <Spinner size={50} />
          </Box>
        }
        {list && list.length === 0 &&
          <Box sx={{ p: 3 }}>
            <NonIdealState
              title="Kosong"
              description="Belum ada data"
            />
          </Box>
        }
        {list && list.map((value) => (
          <ListGroup.Item key={value["id"]}>
            <Flex>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  console.log(e.target.checked);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      name: value["id"],
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  {value["name"]}
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  D-III
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jenjang Studi
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
      <Pagination
        loading={list === null}
        total={paging.total}
        limit={paging.limit}
        skip={paging.skip}
        onClick={({ page, skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Box >
  )
}

export default List;