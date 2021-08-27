import { Checkbox, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient } from "components";
import Filter from "./Filter";
import { useEffect, useReducer, useState } from "react";
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

  useEffect(() => {
    const fetch = async () => {
      setList(null);
      try {
        const res = await client["majors"].find({
          query: {
            $select: ["id", "name", "createdAt"],
            $skip: paging.skip
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
                  // console.log(e);
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
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
                <Box sx={{ color: "gray.5" }}>
                  Jurusan
                </Box>
                <Box>
                  {value["name"]}
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