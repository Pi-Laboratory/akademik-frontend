import { Button, ButtonGroup, Checkbox, Classes } from "@blueprintjs/core";
import { Box, Container, Flex, ListGroup, useClient } from "components";
import { useEffect, useMemo, useState } from "react";

const List = () => {
  const client = useClient();
  const [list, setList] = useState([]);
  const items = useMemo(() => {
    return list.map((item) => {
      let role = "Admin";
      if (item["lecturerId"] !== null) role = "Dosen";
      if (item["studentId"] !== null) role = "Mahasiswa";
      return {
        id: item["id"],
        username: item["username"],
        role: role
      }
    })
  }, [list]);
  useEffect(() => {
    const fetch = async () => {
      console.log(client["users"])
      try {
        const ret = await client["users"].find({
          query: {
            $limit: 50
          }
        });
        setList(ret.data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetch();
  }, []);
  return (
    <Container sx={{ px: 3 }}>
      <ListGroup
        sx={{
          [`.${Classes.CHECKBOX}`]: {
            m: 0
          }
        }}
      >
        <ListGroup.Header>
          <Flex sx={{ alignItems: "center" }}>
            <Box>
              <Checkbox
                onChange={() => {

                }}
              />
            </Box>
            <Box>
            </Box>
          </Flex>
        </ListGroup.Header>
        {items.map((item) => (
          <ListGroup.Item key={item["id"]}>
            <Flex>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox onChange={(e) => {
                  console.log(e);
                }} />
              </Box>
              <Box sx={{ flexGrow: 1, flexShrink: 0 }}>
                <Box>
                  {item["username"]}
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Username
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, flexShrink: 0 }}>
                <Box>
                  {item["role"]}
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Role
                </Box>
              </Box>
            </Flex>
          </ListGroup.Item>))}
      </ListGroup>
    </Container>
  )
}

export default List;