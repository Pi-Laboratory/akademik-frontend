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
          }}
        />
      </Box>
      <Flex sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, flexShrink: 0, width: `${100 / 3}%` }}>
          <Box>
            {item["username"]}
          </Box>
          <Box sx={{ color: "gray.5" }}>
            Username
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, flexShrink: 0, width: `${100 / 3}%` }}>
          <Box>
            {item["role"]}
          </Box>
          <Box sx={{ color: "gray.5" }}>
            Role
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, flexShrink: 0, width: `${100 / 3}%` }}>
          {item["link"]["url"] &&
            <Box>
              <Link to={item["link"]["url"]}>
                {item["link"]["label"]}
              </Link>
            </Box>
          }
        </Box>
      </Flex>
      <Box className="action">
        <Button
          minimal={true}
          icon="edit"
          onClick={() => {
            setDialogOpen("edit")
          }}
        />
      </Box>
      <DialogEdit
        data={item.user}
        isOpen={dialogOpen === "edit"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => { history.go(0) }}
      />
    </Flex>
  )
}

export default Item