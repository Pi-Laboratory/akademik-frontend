import { Checkbox, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient } from "components";
import Filter from "./Filter";
import { Link } from "react-router-dom";
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
  const [studyPrograms, setStudyPrograms] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["study-programs"].find({
          query: {
            $select: ["id", "name"]
          }
        });
        setStudyPrograms(res.data.map(({ id, name }) => ({ label: name, value: id })));
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client,]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["curriculums"].find({
          query: {
            $select: ["id", "name", "ideal_study_period", "maximum_study_period", "created_at"]
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
  }, [client,]);

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
                label="Tahun"
                options={[
                  { label: "2020", value: 0 },
                  { label: "2019", value: 0 },
                  { label: "2018", value: 1 },
                  { label: "2017", value: 2 },
                  { label: "2016", value: 3 },
                  { label: "2015", value: 3 },
                ]}
              />
              <Select
                minimal={true}
                label="Program Studi"
                options={studyPrograms}
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
                  <Link to={`mata-kuliah`}>
                    {value["name"]}
                  </Link>
                </Box>

              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  2
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  min
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  3
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Min.Percobaan
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  3
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Maks Nilai D
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  24
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Mata Kuliah
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                Teknik Elektro
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