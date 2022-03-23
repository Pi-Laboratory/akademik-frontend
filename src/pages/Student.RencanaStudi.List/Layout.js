import { Box, Flex, ListGroup, useList, Pagination } from 'components'
import List from './List'
import { Button, Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'

export const Layout = () => {

  const {
    selectedItem,
    paging,
    setPaging,
    items,
    status,
    dispatchSelectedItem,
  } = useList();

  return (
    <Box>
      <Box sx={{ px: 3, pt: 3 }}>
        <Filter />
        <ListGroup sx={{
          width: "100%",
          [`.${Classes.CHECKBOX}`]: {
            m: 0
          }
        }}>
          <ListGroup.Header>
            <Flex sx={{ alignItems: "center" }}>
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
