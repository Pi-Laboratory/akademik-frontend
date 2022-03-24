import { Button, Checkbox, Classes, HTMLSelect, } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient, useList } from "components";
import Filter from "./Filter";
import { useCallback, useState } from "react";
import { Pagination } from "components/Pagination";
import List from "./List";
import { filterField } from ".";

const Layout = () => {
  const client = useClient();
  const { paging, setPaging, filter, setFilter, items, status, dispatchSelectedItem } = useList();

  const [studyPrograms, setStudyPrograms] = useState([]);

  const [loading, setLoading] = useState({
    studyProgram: false,
    major: false
  })

  const fetchStudyPrograms = useCallback(async (query) => {
    setLoading(loading => ({ ...loading, studyProgram: true }));
    const res = await client["study-programs"].find({
      query: {
        "name": query ? {
          $iLike: `%${query}%`
        } : undefined,
        $limit: "100",
        $select: ["id", "name"],
        $include: [{
          model: "majors",
          $select: ["name"]
        }]
      }
    });
    await setStudyPrograms(res.data.map(({ id, name, major }) => ({
      label: name,
      value: id,
      info: major["name"]
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
              <HTMLSelect
                minimal={true}
                value={filter["semester"] || ""}
                onChange={(e) => {
                  setFilter(f => ({ ...f, semester: e.target.value }));
                }}
                options={new Array(9).fill(0).map((_, i) => {
                  if (i === 0) return {
                    label: "Semester",
                    value: ""
                  }
                  return {
                    label: `${i} ${i % 2 ? "Gasal" : "Genap"}`,
                    value: i,
                  }
                })}
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
                onQueryChange={(query) => {
                  fetchStudyPrograms(query);
                }}
                onOpening={async () => await fetchStudyPrograms()}
                options={studyPrograms}
              />
              {filterField.map(f => !!filter[f]).indexOf(true) !== -1
                && <Button
                  title="Clear Filter"
                  minimal={true}
                  intent="warning"
                  icon="filter-remove"
                  onClick={() => {
                    const ff = {};
                    filterField.forEach(f => ff[f] = undefined);
                    setFilter(filter => ({
                      ...filter,
                      ...ff
                    }));
                  }}
                />}
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