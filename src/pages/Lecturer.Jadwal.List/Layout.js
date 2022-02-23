import { Button, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useList, Select, useClient } from "components";
import Filter from "./Filter";
import List from "./List";
import { Pagination } from "components/Pagination";
import { useCallback, useEffect, useState } from "react";

const Layout = () => {
  const client = useClient();
  const { paging, setPaging, items, filter, setFilter } = useList();
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [loading, setLoading] = useState({
    "study_program_id": false
  });

  const fetchStudyPrograms = useCallback(async () => {
    setLoading((l) => ({ ...l, "study_program_id": true }));
    try {
      const res = await client["study-programs"].find({
        query: {
          $limit: 100,
          $select: ["id", "name"],
          $include: [{
            model: "majors",
            $select: ["id", "name"]
          }]
        }
      });
      setStudyPrograms(res.data.map(({ id, name, major }) => {
        return {
          info: major["name"],
          value: id,
          label: name
        }
      }));
    } catch (err) {
      console.error(err);
    }
    setLoading((l) => ({ ...l, "study_program_id": false }));
  }, [client]);

  useEffect(() => {
    if (filter["study_program_id"]) {
      fetchStudyPrograms();
    }
  }, [filter, fetchStudyPrograms]);

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
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexShrink: 0 }} >
              <Select
                minimal={true}
                label="Program Studi"
                value={filter["study_program_id"]}
                loading={loading["study_program_id"]}
                options={studyPrograms}
                onOpening={() => fetchStudyPrograms()}
                onChange={({ value }) => {
                  setFilter(filter => ({ ...filter, "study_program_id": value }))
                }}
              />
              {[
                !!filter["study_program_id"],
              ].indexOf(true) !== -1
                && <Button
                  minimal={true}
                  intent="warning"
                  icon="filter-remove"
                  onClick={() => {
                    setFilter(filter => ({
                      ...filter,
                      "study_program_id": null
                    }))
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
        onClick={({ skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Box >
  )
}

export default Layout;