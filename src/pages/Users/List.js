import { Checkbox, Classes, NonIdealState } from "@blueprintjs/core";
import { Box, Container, Flex, ListGroup, useClient, useList } from "components";
import { Pagination } from "components/Pagination";
import { useEffect } from "react";

const List = () => {
  const client = useClient();
  const { items, setItems, status, paging, setPaging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["users"].find({
          query: {
            $limit: 50
          }
        });
        setItems(res.data.map((item) => {
          let role = "Admin";
          if (item["lecturer_id"] !== null) role = "Dosen";
          if (item["student_id"] !== null) role = "Mahasiswa";
          return {
            id: item["id"],
            username: item["username"],
            role: role
          }
        }));
        setPaging({
          total: res.total,
          limit: res.limit,
          skip: res.skip
        });
      } catch (err) {
        console.error(err);
        setItems([]);
      }
    }
    fetch();
  }, [client]); // eslint-disable-line react-hooks/exhaustive-deps
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
            <Box>
            </Box>
          </Flex>
        </ListGroup.Header>
        {items && items.length === 0 && (
          <Box sx={{ my: 3 }}>
            <NonIdealState
              title="No user available"
            />
          </Box>
        )}
        {items && items.map((item) => (
          <ListGroup.Item key={item["id"]}>
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
              <Box sx={{ flexGrow: 1, flexShrink: 0, width: "50%" }}>
                <Box>
                  {item["username"]}
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  Username
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, flexShrink: 0, width: "50%" }}>
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
        loading={items === null}
        total={paging.total}
        limit={paging.limit}
        skip={paging.skip}
        onClick={({ page, skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Container >
  )
}

export default List;