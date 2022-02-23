import { Button, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Pagination, Select, useClient, useList } from "components";
import { useCallback, useEffect, useState } from "react";
import Filter from "./Filter";
import List from "./List";

const PresensiNilaiList = () => {
  const client = useClient();
  const { paging, setPaging, items, filter, setFilter } = useList();
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [loading, setLoading] = useState({
    studyPrograms: false
  })
  const fetchStudyPrograms = useCallback(async () => {
    setLoading(l => ({ ...l, studyPrograms: true }));
    if (studyPrograms.length > 0) {
      setLoading(l => ({ ...l, studyPrograms: false }));
      return;
    }
    try {
      const res = await client["study-programs"].find({
        query: {
          $select: ["id", "name"],
          $include: [{
            model: "majors",
            $select: ["id", "name"]
          }]
        }
      });
      setStudyPrograms(res.data.map((x) => {
        return {
          label: x["name"],
          value: x["id"],
          info: x["major"]["name"],
        }
      }));
    } catch (err) {
      console.error(err);
    }
    setLoading(l => ({ ...l, studyPrograms: false }));
  }, [client, studyPrograms]);

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
            <Box sx={{ flexShrink: 0 }}>
              <Select
                minimal={true}
                label="Program Studi"
                loading={loading["studyPrograms"]}
                value={filter["study_program_id"]}
                onOpening={() => {
                  fetchStudyPrograms();
                }}
                options={studyPrograms}
                onChange={({ value }) => {
                  setFilter(f => ({
                    ...f,
                    study_program_id: value
                  }))
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
        onClick={({ page, skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Box >
  )
}

export default PresensiNilaiList;