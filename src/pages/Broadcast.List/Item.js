import { Checkbox, Tag } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useList } from "components";
import { Link } from "react-router-dom";

export const Item = ({ data }) => {
  const { selectedItem, dispatchSelectedItem } = useList();
  
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
            checked={selectedItem.indexOf(data["id"]) !== -1}
            onChange={(e) => {
              dispatchSelectedItem({
                type: "toggle",
                data: {
                  name: data["id"],
                  value: e.target.checked
                }
              })
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1, mr: 3 }}>
          <Box>
            <Link to={data["url"]}>
              {data["name"]}
            </Link>
          </Box>
          <Box>
            {data["username"]}
          </Box>
        </Box>
        <Box sx={{ pr: 2, width: "35%" }}>
          <Box sx={{color: "gray.5"}}>
            Role
          </Box>
          <Box>
            {data["role"]}
          </Box>
        </Box>
        <Box sx={{ pr: 2, width: "15%" }}>
          
        </Box>
      </Flex>
    </ListGroup.Item>
  )
}