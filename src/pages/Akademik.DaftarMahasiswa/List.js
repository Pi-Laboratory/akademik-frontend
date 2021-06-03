import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Divider, Flex, ListGroup, Select } from 'components'
import { Button } from '@blueprintjs/core'

const List = ({ length }) => {
  const [filtered, toggleFiltered] = useState(false);

  return (
    <>
      <ListGroup sx={{ mb: 3 }}>
        <ListGroup.Header>
          <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Box as={Flex}>
              <Button minimal onClick={() => toggleFiltered(!filtered)} intent={filtered ? 'primary' : undefined} icon="disable" text="Cuti" />
              <Divider sx={{ mx: 2 }} />
              <Button minimal onClick={() => toggleFiltered(!filtered)} intent={filtered ? 'primary' : undefined} icon="export" text="Drop Out" />
            </Box>
            <Flex>
              <Select
                minimal={true}
                options={[
                  { label: "2020/2021", value: 0 }
                ]}
                label="Angkatan"
              />
              <Select
                minimal={true}
                options={[
                  { label: "1TK1", value: 0 }
                ]}
                label="Kelas"
              />
              <Select
                minimal={true}
                options={[
                  { label: "Teknik Komputer", value: 0 }
                ]}
                label="Program Studi"
              />
            </Flex>
          </Flex>
        </ListGroup.Header>
        {Array.apply(null, { length: typeof length === 'undefined' ? filtered ? 5 : 150 : length }).map(() => (
          <ListGroup.Item>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column !important', justifyContent: 'center' }}>
                <Box>
                  <Link to={`/akademik-mahasiswa/angkatan/1/detail/1`}>Ridho X Wira</Link>
                  <p className="bp3-text-muted">2100666</p>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row !important', justifyContent: 'center', alignItems: 'center' }}>
                <Box as="p" sx={{ mx: 1 }}>Teknik Komputer</Box>
                <Box as="p" sx={{ mx: 1 }} className="bp3-text-muted">1TK2</Box>
              </Box>
              <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <p>Angkatan 2021</p>
              </Box>
            </Flex>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <p className="bp3-text-muted">{length} data mahasiswa</p>
    </>
  )
}

List.defaultProps = {
  length: 50
}
export default List