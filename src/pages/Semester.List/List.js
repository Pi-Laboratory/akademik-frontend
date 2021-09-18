import { Checkbox, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, paging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["semesters"].find({
          query: {
            $select: ["id", "year", "type", "created_at"],
            $skip: paging.skip
          }
        });
        setItems(res.data);
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
  }, [client, paging.skip, setItems, setPaging]);

  return (
    <>
      {items === null &&
        <Box sx={{ p: 2 }}>
          <Spinner size={50} />
        </Box>
      }
      {items && items.length === 0 &&
        <Box sx={{ p: 3 }}>
          <NonIdealState
            title="Kosong"
            description="Belum ada data"
          />
        </Box>
      }
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

            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                <Link to={`${item["id"]}`}>
                  {item["year"]}
                </Link>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box sx={{ color: "gray.5" }}>
                Semester
              </Box>
              <Box>
                {item["type"]}
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box sx={{ color: "gray.5" }}>
                Status
              </Box>
              <Box>
                Aktif
              </Box>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;