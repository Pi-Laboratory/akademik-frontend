import { Box, Flex, ListGroup, Select, useClient, useList } from 'components'
import React, { useEffect, useState } from 'react'
import List from './List'
import { Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'
import { Pagination } from 'components/Pagination'

export const Layout = () => {
  const client = useClient();
  const { paging, setPaging, items, status, dispatchSelectedItem } = useList();

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
  }, [client]);

  return (
    <Box>
      <Box sx={{ px: 3, pt: 3 }}>
        <Filter />
        <ListGroup
          sx={{
            [`.${Classes.CHECKBOX}`]: {
              m: 0
            }
          }}
        >
          <ListGroup.Header>
            <Flex sx={{ alignItems: "center" }}>
              <Box sx={{ width: 40, flexShrink: 0 }}>
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
