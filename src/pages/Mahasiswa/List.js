import { Button, ButtonGroup, Checkbox, Classes, ControlGroup, H2, InputGroup } from '@blueprintjs/core'
import { Box, Flex, ListGroup, Select, Divider } from 'components'
import React from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  return (
    <>
      <Box sx={{ px: 3, mb: 3 }}>
        <Box as={H2} sx={{ m: 0 }}>Mahasiswa</Box>
      </Box>
      <Divider />
      <Box sx={{ width: "100%", pt: 3, pl: 3 }}>
        <Flex
          sx={{
            mb: 3,
            mr: -3,
            "> div": {
              mr: 3
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <ControlGroup>
              <Button text="Filter" />
              <InputGroup fill={true} />
            </ControlGroup>
          </Box>
          <Box>
            <ButtonGroup>
              <Button text="Alumni" />
              <Button text="Drop out" />
            </ButtonGroup>
          </Box>
          <Box>
            <Button intent="primary" text="Mahasiswa Baru" />
          </Box>
        </Flex>
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
          {Array(25).fill(0).map((_, idx) => (
            <ListGroup.Item key={idx}>
              <Flex>
                <Box sx={{ width: 40, flexShrink: 0 }}>
                  <Checkbox onChange={(e) => {
                    console.log(e);
                  }} />
                </Box>
                <Box sx={{ width: "15%", flexShrink: 0 }}>
                  {Math.round(Math.random() * 12093)}
                </Box>
                <Box sx={{ flexGrow: 1, mr: 3 }}>
                  <Box>
                    <Link to={`mahasiswa/${idx}`}>
                      Prof. Dr. Imanuel Pundoko, S.Th.
                    </Link>
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  Teknik Elektro
                </Box>
              </Flex>
            </ListGroup.Item>
          ))}
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
    </>
  )
}

export default List
