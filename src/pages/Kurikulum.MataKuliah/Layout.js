import { Checkbox, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient } from "components";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useReducer, useState } from "react";
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
  const [filter, setFilter] = useState({
    "major_id": "",
    "study_program_id": "",
  });

  const [majors, setMajors] = useState([]);
  const [studyPrograms, setStudyPrograms] = useState([]);

  const [loading, setLoading] = useState({
    studyProgram: false,
    major: false
  })

  const fetchMajors = useCallback(async () => {
    setLoading(loading => ({ ...loading, major: true }));
    const res = await client["majors"].find({
      query: {
        $select: ["id", "name"]
      }
    });
    setMajors(res.data.map(({ id, name }) => ({
      label: name,
      value: id
    })));
    setLoading(loading => ({ ...loading, major: false }));
  }, [client]);

  const fetchStudyPrograms = useCallback(async (major) => {
    setLoading(loading => ({ ...loading, studyProgram: true }));
    const res = await client["study-programs"].find({
      query: {
        major_id: major,
        $select: ["id", "name"]
      }
    });
    await setStudyPrograms(res.data.map(({ id, name }) => ({
      label: name,
      value: id
    })));
    setLoading(loading => ({ ...loading, studyProgram: false }));
  }, [client]);

  useEffect(() => {
    const fetch = async () => {
      setList(null);
      try {
        const res = await client["subjects"].find({
          query: {
            $select: ["id", "code", "name", "major_id", "created_at"],
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
                  console.log(e);
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexShrink: 0 }}>
              <Select
                loading={loading["major"]}
                minimal={true}
                label="Jurusan"
                value={filter["major_id"]}
                onChange={({ value }) => setFilter(filter => ({
                  ...filter,
                  "major_id": value
                }))}
                onOpening={async () => await fetchMajors()}
                options={majors}
              />
              <Select
                loading={loading["studyProgram"]}
                minimal={true}
                label="Program Studi"
                onChange={({ value }) => setFilter(filter => ({
                  ...filter,
                  "study_program_id": value
                }))}
                value={filter["study_program_id"]}
                onOpening={async () => await fetchStudyPrograms(filter["major_id"])}
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
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      name: value["id"],
                      value: e.target.checked
                    }
                  })
                }} />
              </Box>

              <Box sx={{ width: "15%", flexGrow: 1, mr: 3 }}>
                <Box>
                  {value["name"]}
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  {value["code"]}
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  <Link to={`semester`}>
                    1
                  </Link>
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Semester
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  3
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  SKS
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  3
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Jam
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                Teori
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