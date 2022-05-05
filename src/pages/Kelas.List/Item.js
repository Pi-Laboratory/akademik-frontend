import { Button, Checkbox } from "@blueprintjs/core";
import { Box, Flex, useList } from "components";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DialogEdit from "./Dialog.Edit";

const Item = ({
  data: item
}) => {
  const { selectedItem, dispatchSelectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState();
  const history = useHistory();

  return (
    <Flex>
      <Box sx={{ width: 40, flexShrink: 0 }}>
        <Checkbox
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
        <Box sx={{ width: "15%", flexGrow: 1, mr: 3 }}>
          <Box>
            <Link to={`/kelas/${item["id"]}`}>
              {item["name"]}
            </Link>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, mr: 3 }}>
          <Box sx={{ color: "gray.5" }}>
            Jumlah Mahasiswa
          </Box>
          <Box>
            {item["students"].length}
          </Box>
        </Box>
        <Box sx={{ width: "15%", flexGrow: 1, mr: 3 }}>
          <Box sx={{ color: "gray.5" }}>
            Program Studi
          </Box>
          <Box>
            {item["study_program"]["name"]}
          </Box>
        </Box>
      </Flex>
      <Box className="action">
        <Button
          minimal={true}
          icon={"edit"}
          onClick={() => {
            setDialogOpen("edit")
          }}
        />
      </Box>
      <DialogEdit
        data={item}
        isOpen={dialogOpen === "edit"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => { history.go(0) }}
      />
    </Flex>
  )
}
export default Item;