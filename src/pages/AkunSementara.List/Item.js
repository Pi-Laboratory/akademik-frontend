import { Button, Checkbox, Tag } from "@blueprintjs/core"
import { Box, Flex, ListGroup, useList } from "components"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react";
import { DialogPassed } from "./Dialog.Passed";
import { DialogFailed } from "./Dialog.Failed";

export const Item = ({ data: item }) => {
  const { selectedItem, dispatchSelectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);
  const history = useHistory();
  return (
    <ListGroup.Item sx={{
      ".action": {
        display: "none",
      },
      "&:hover .action": {
        display: "flex",
      }
    }}>
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
        <Box sx={{ flexGrow: 1, mr: 3 }}>
          <Box>
            <Link to={`penerimaan/${item["id"]}`}>
              {item["student"] && item["student"]["name"]}
            </Link>
          </Box>
          <Box>
            {item["nisn"]}
          </Box>
        </Box>
        <Box sx={{ pr: 2, width: "35%" }}>
          <Box>
            {item["school_name"]}
          </Box>
          <Box>
            {item["nisn"]}
          </Box>
        </Box>
        <Box sx={{ pr: 2, width: "15%" }}>
          <Tag
            minimal={true}
            intent={item["status"] === "passed" ? "success" : item["status"] === "failed" ? "danger" : "none"}
          >
            {item["status"]}
          </Tag>
        </Box>
        <Box sx={{
          pr: 2,
          width: 60
        }}>
          {item["status"] === "registered" &&
            <Flex className="action">
              <Button
                intent="primary"
                minimal={true}
                icon="confirm"
                title="Passed"
                onClick={() => {
                  dispatchSelectedItem({
                    type: "add",
                    data: {
                      name: item["id"],
                      value: true
                    }
                  });
                  setDialogOpen("passed");
                }}
              />
              <Button
                intent="danger"
                minimal={true}
                icon="small-cross"
                title="Failed"
                onClick={() => {
                  dispatchSelectedItem({
                    type: "add",
                    data: {
                      name: item["id"],
                      value: true
                    }
                  });
                  setDialogOpen("failed");
                }}
              />
              <DialogPassed
                data={item}
                status={dialogOpen}
                isOpen={dialogOpen === "passed"}
                onClose={() => {
                  setDialogOpen(null);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      name: item["id"],
                      value: false
                    }
                  });
                }}
                onSubmitted={() => {
                  history.go(0);
                }}
              />
              <DialogFailed
                data={item}
                status={dialogOpen}
                isOpen={dialogOpen === "failed"}
                onClose={() => {
                  setDialogOpen(null);
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      name: item["id"],
                      value: false
                    }
                  });
                }}
                onSubmitted={() => {
                  history.go(0);
                }}
              />
            </Flex>}
        </Box>
      </Flex>
    </ListGroup.Item>
  )
}