import { Checkbox, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient } from "components";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Pagination } from "components/Pagination";

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
  const client = useClient();
  const [selectedItem, dispatchSelectedItem] = useReducer(selectedItemReducer, []);
  const [list, setList] = useState(null);
  const [paging, setPaging] = useState({
    total: null,
    limit: null,
    skip: 0,
  });

  const fetchList = useCallback(async () => {
    setList(null);
    try {
      const res = await client["rooms"].find({
        query: {
          $select: ["id", "name", "capacity", "code", "type"]
        }
      });
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
  }, [client]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

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
        {list && list.map((value) => {
          console.log(selectedItem.indexOf(value["id"]) !== -1);
          return (
            <ListGroup.Item key={value["id"]}>
              <Flex>
                <Box sx={{ width: 40, flexShrink: 0 }}>
                  <Checkbox
                    checked={selectedItem.indexOf(value["id"]) !== -1}
                    onChange={(e) => {
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
                    <Link to={`/manajemen-ruang/ruang/${value["id"]}`}>
                      {value["name"]}
                    </Link>
                  </Box>
                  <Box sx={{ color: "gray.5" }}>
                    {value["code"]}
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1, mr: 3 }}>
                  <Box sx={{ color: "gray.5" }}>
                    Tipe
                  </Box>
                  <Box>
                    {value["type"]}
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1, mr: 3 }}>
                  <Box sx={{ color: "gray.5" }}>
                    Kapasitas
                  </Box>
                  <Box>
                    {value["capacity"]} orang
                  </Box>
                </Box>
              </Flex>
            </ListGroup.Item>
          )
        })}
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