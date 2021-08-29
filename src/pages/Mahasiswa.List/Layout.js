import { Box, Divider, Flex, ListGroup, Select } from 'components'
import React from 'react'
import List from './List'
import Header from './Header'
import { Button, ButtonGroup, Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'

export const Layout = () => {
  return (
    <Box>
      <Header />
      <Divider />
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
                  onChange={(e) => {
                    console.log(e);
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
        <Flex sx={{ my: 3, justifyContent: "center" }}>
          <Button minimal={true} icon="chevron-left" text="Previous" />
          <ButtonGroup>
            <Button text="1" active={true} />
            <Button text="2" />
            <Button text="3" />
          </ButtonGroup>
          <Button minimal={true} text="Next" rightIcon="chevron-right" />
        </Flex>
      </Box>
    </Box>
  )
}
