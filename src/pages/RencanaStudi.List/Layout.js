import { Box, Flex, ListGroup, Select, useClient, useList, Pagination } from 'components'
import React, { useEffect, useCallback, useState } from 'react'
import List from './List'
import { Button, Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'

export const Layout = () => {
  const client = useClient();
  const { paging, setPaging, filter, setFilter, items, status, dispatchSelectedItem } = useList();

  const [studyPrograms, setStudyPrograms] = useState([]);

  const fetchStudyPrograms = useCallback(async () => {
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
      setStudyPrograms(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [client]);

  useEffect(() => {
    fetchStudyPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box sx={{ px: 3, pt: 3 }}>
        <Filter />
        <ListGroup>
          <ListGroup.Header>
            <Flex sx={{ alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ flexShrink: 0 }}>
                <Select
                  minimal={true}
                  label="Angkatan"
                  value={filter["generation"]}
                  options={Array(25).fill(0).map((_, idx) => {
                    const year = String(new Date().getFullYear() - idx);
                    return ({
                      label: year,
                      value: year
                    })
                  })}
                  onChange={({ value }) => {
                    setFilter(filter => ({ ...filter, "generation": value }))
                  }}
                />
                <Select
                  minimal={true}
                  label="Program Studi"
                  value={filter["study_program_id"]}
                  options={studyPrograms.map((item) => {
                    return {
                      label: item["name"],
                      value: item["id"],
                      info: item["major"]["name"]
                    }
                  })}
                  onChange={({ value }) => {
                    setFilter(filter => ({ ...filter, "study_program_id": value }))
                  }}
                />
                {[
                  !!filter["study_program_id"],
                  !!filter["generation"],
                ].indexOf(true) !== -1
                  && <Button
                    minimal={true}
                    intent="warning"
                    icon="filter-remove"
                    onClick={() => {
                      setFilter(filter => ({
                        ...filter,
                        "study_program_id": null,
                        "generation": null
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
      </Box>
    </Box>
  )
}
