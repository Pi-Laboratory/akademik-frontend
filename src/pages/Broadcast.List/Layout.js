import { Box, Flex, ListGroup, useList, Pagination } from 'components'
import List from './List'
import { Button, Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DialogPublish } from './Dialog.Publish'

export const Layout = () => {

  const {
    selectedItem,
    paging,
    setPaging,
    items,
    status,
    dispatchSelectedItem,
  } = useList();

  const [dialogOpen, setDialogOpen] = useState(null);

  const history = useHistory();

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
              <Flex sx={{ flexGrow: 1, alignItems: "center" }}>
                {selectedItem.length > 0
                  && <Box>{selectedItem.length} of {paging.total} selected</Box>
                }
                {selectedItem.length > 0 &&
                  <Box sx={{ ml: 2 }}>
                    <Button
                      outlined={true}
                      text={`Create Message`}
                      intent="primary"
                      onClick={() => {
                        setDialogOpen("publish");
                      }}
                    />
                  </Box>}
                <DialogPublish
                  data={selectedItem}
                  isOpen={dialogOpen === "publish"}
                  onClose={() => { setDialogOpen(null) }}
                  onSubmitted={() => {
                    history.go(0);
                  }}
                />
              </Flex>
              <Box>

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
