import { Checkbox, Classes, NonIdealState } from "@blueprintjs/core";
import { Box, Container, Flex, ListGroup, useClient } from "components";
import { Pagination } from "components/Pagination";
import { useEffect, useMemo, useState } from "react";

const List = () => {
  const client = useClient();
  const [list, setList] = useState(null);
  const [paging, setPaging] = useState({
    total: null,
    limit: null,
    skip: 0,
  });
  const items = useMemo(() => {
    if (list === null) return [];
    return list.map((item) => {
      let role = "Admin";
      if (item["lecturer_id"] !== null) role = "Dosen";
      if (item["student_id"] !== null) role = "Mahasiswa"
      return {
        id: item["id"],
        username: item["username"],
        role: role
      }
    })
  }, [list]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["users"].find({
          query: {
            $limit: 50
          }
        });
        setList(res.data);
        setPaging({
          total: res.total,
          limit: res.limit,
          skip: res.skip
        });
      } catch (err) {
        console.error(err.message);
      }
    }
    fetch();
  }, [client]);
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
        {items.length === 0 && (
          <Box sx={{ my: 3 }}>
            <NonIdealState
              title="No user available"
            />
          </Box>
        )}
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
      <Pagination
        loading={list === null}
        total={paging.total}
        limit={paging.limit}
        skip={paging.skip}
        onClick={({ page, skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Container>
  )
}

export default List;