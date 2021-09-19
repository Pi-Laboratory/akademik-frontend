import { Box, Flex, ListGroup, Select, useList } from 'components'
import React from 'react'
import List from './List'
import { Button, Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'
import { Pagination } from 'components/Pagination'

export const Layout = () => {
  const { paging, setPaging, items, status, dispatchSelectedItem } = useList();
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
              <Box sx={{ ml: -10 }}>
                <Button
                  minimal={true}
                  icon="circle"
                  text={`${Math.round(Math.random() * 250)} Aktif`}
                />
                <Button
                  minimal={true}
                  icon="disable"
                  text={`${Math.round(Math.random() * 250)} Cuti`}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ flexShrink: 0 }}>
                <Select
                  minimal={true}
                  label="Angkatan"
                  options={[
                    { label: "Aktif", value: true },
                    { label: "Tidak Aktif", value: false }
                  ]}
                />
                <Select
                  minimal={true}
                  label="Program Studi"
                  options={[
                    { label: "Aktif", value: true },
                    { label: "Tidak Aktif", value: false }
                  ]}
                />
                <Select
                  filterable={false}
                  minimal={true}
                  label="Sort"
                  options={[
                    { label: "Aktif", value: true },
                    { label: "Tidak Aktif", value: false }
                  ]}
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
