import { Box, Flex, ListGroup, Select, useClient, useList, Pagination } from 'components'
import React from 'react'
import List from './List'
import { Button, Classes } from '@blueprintjs/core'
import Filter from './Filter'
import { FetchAndSelect } from 'components/FetchAndSelect'

export const Layout = () => {
  const client = useClient();
  const { paging, setPaging, filter, setFilter, items } = useList();

  return (
    <Box>
      <Box sx={{ px: 3, pt: 4 }}>
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
                <FetchAndSelect
                  minimal={true}
                  placeholder="Program Studi"
                  service={client["study-programs"]}
                  id="f-study_program_id"
                  name="study_program_id"
                  value={filter["study_program_id"]}
                  onChange={({ value }) => {
                    setFilter(filter => ({ ...filter, "study_program_id": value }))
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      "name": q ? {
                        $iLike: `%${q}%`
                      } : undefined,
                      $select: ["id", "name"],
                      $include: [{
                        model: "majors",
                        $select: ["id", "name"]
                      }]
                    }
                  }}
                  onFetched={(items) => {
                    return items.map((item) => {
                      return {
                        label: item["name"],
                        value: `${item["id"]}`,
                        info: item["major"]["name"]
                      }
                    })
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
