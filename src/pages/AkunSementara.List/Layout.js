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
              <Box sx={{ width: 40, flexShrink: 0, }}>
                <Checkbox
                  disabled={paging.total === 0}
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
              <Box sx={{ flexGrow: 1 }}>
                {selectedItem.length > 0
                  && <Box>{selectedItem.length} selected</Box>
                }
                {items !== null
                  && (selectedItem.length === items.length)
                  && (selectedItem.length < paging.total)
                  && <Button
                    minimal={true}
                    intent="primary"
                    text={`Select all ${paging.total} item`}
                    onClick={() => { }}
                  />
                }
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
