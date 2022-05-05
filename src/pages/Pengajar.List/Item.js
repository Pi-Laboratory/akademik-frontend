import { Button, Checkbox, Icon } from "@blueprintjs/core";
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
      <Box sx={{ width: 24, px: 0, flexShrink: 0 }}>
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
        <Box sx={{ flexGrow: 1, px: 2, mr: 3 }}>
          <Flex sx={{ alignItems: "center" }}>
            <Box sx={{ mr: 1 }}>
              {item["employee"] &&
                <Link to={`/pengajar/${item["id"]}`}>
                  {`${item["employee"]["front_degree"] || ""} ${item["employee"]["name"]} ${item["employee"]["back_degree"] || ""}`}
                </Link>}
            </Box>
            {item["certified"] &&
              <Box as={Icon} sx={{ color: "green.4" }} iconSize={12} icon="endorsed" />}
          </Flex>
          <Box sx={{ color: "gray.5" }}>
            {item["nidn"]}
          </Box>
        </Box>
        {item["study_program"] &&
          <Box sx={{ width: "35%", mr: 3 }}>
            <Box sx={{ color: "gray.5" }}>
              Program Studi
            </Box>
            <Box>
              {item["study_program"]["name"]}
            </Box>
          </Box>}
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