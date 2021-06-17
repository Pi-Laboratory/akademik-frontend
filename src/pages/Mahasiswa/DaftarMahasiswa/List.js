import { Box, Flex, ListGroup } from 'components'
import React from 'react'
import { Link } from 'react-router-dom'

const List = ({ length }) => {
  return (
    <ListGroup>
      {Array.apply(null, { length: typeof length === 'undefined' ? 150 : length }).map(() => (
        <ListGroup.Item>
          <Flex sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column !important', justifyContent: 'center' }}>
              <Box>
                <Link to={`/akademik-mahasiswa/angkatan/1/detail/1`}>Ridho X Wira</Link>
                <p className="bp3-text-muted">2100666</p>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <p>Angkatan 2021</p>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

List.defaultProps = {
  length: 50
}
export default List