import { Checkbox, Classes, } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient, useList } from "components";
import Filter from "./Filter";
import { useCallback, useState } from "react";
import { Pagination } from "components/Pagination";
import List from "./List";

const Layout = () => {
  const client = useClient();
  const { paging, setPaging, filter, setFilter, items, status, dispatchSelectedItem } = useList();

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
              <Checkbox
                checked={status.checked}
                indeterminate={status.indeterminate}
                onChange={(e) => {
                  dispatchSelectedItem({
                    type: "all",
                    data: e.target.checked
                  })
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
        <List />
      </ListGroup>
      <Pagination
        loading={items === null}
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

export default Layout;