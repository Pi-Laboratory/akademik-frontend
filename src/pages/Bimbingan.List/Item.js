import { Button, Checkbox } from '@blueprintjs/core'
import { Box, Flex, useList } from 'components'
import { Link, useHistory } from 'react-router-dom'
import { useState, useMemo } from 'react';
import { DialogEdit } from './Dialog.Edit';
import { DialogAssign } from './Dialog.Assign';

const Item = ({
  data: item
}) => {
  const { selectedItem, dispatchSelectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState();
  const history = useHistory();

  const hasPreceptor = useMemo(() => {
    return item.preceptor !== null;
  }, [item.preceptor])

  return (
    <Flex>
      <Box sx={{ width: 40, flexShrink: 0 }}>
        <Checkbox
          disabled={!!item["preceptor"]}
          checked={selectedItem.indexOf(item["id"]) !== -1}
          onChange={(e) => {
            dispatchSelectedItem({
              type: "toggle",
              data: {
                name: item["id"],
                value: e.target.checked
              }
            })
          }} />
      </Box>
      <Flex sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, mr: 3 }}>
          <Box>
            <Link to={`mahasiswa/${item["id"]}/`}>
              {item["name"]}
            </Link>
          </Box>
          <Box>
            {item["nim"]}
          </Box>
        </Box>
        <Box sx={{ width: "25%", flexShrink: 0 }}>
          {hasPreceptor &&
            <>
              <Box sx={{ color: "gray.5" }}>
                Dibimbing oleh
              </Box>
              <Box>
                <Link to={`pengajar/${item["id"]}/`}>
                  {item["preceptor"]["lecturer"]["employee"]["name"]}
                </Link>
              </Box>
            </>}
          {!hasPreceptor &&
            <Box sx={{ color: "gray.5" }}>
              Belum ada pembimbing
            </Box>}
        </Box>
        <Box sx={{ width: "10%", flexShrink: 0 }}>
          {item["generation"]}
        </Box>
        <Box sx={{ width: "20%", flexShrink: 0 }}>
          <Box sx={{ color: "gray.5" }}>
            Program Studi
          </Box>
          <Box>
            {item["study_program"]["name"]}
          </Box>
        </Box>
      </Flex>
      <Box className="action">
        {!hasPreceptor &&
          <Button
            minimal={true}
            icon={"send-message"}
            onClick={() => {
              setDialogOpen("assign")
            }}
          />}
        {hasPreceptor &&
          <Button
            minimal={true}
            icon={"edit"}
            onClick={() => {
              setDialogOpen("edit")
            }}
          />}
      </Box>
      {!hasPreceptor &&
        <DialogAssign
          data={[item.id]}
          isOpen={dialogOpen === "assign"}
          onClose={() => { setDialogOpen(null) }}
          onSubmitted={() => { history.go(0) }}
        />}
      {hasPreceptor &&
        <DialogEdit
          data={item}
          isOpen={dialogOpen === "edit"}
          onClose={() => { setDialogOpen(null) }}
          onSubmitted={() => { history.go(0) }}
        />}
    </Flex>
  )
}
export default Item;