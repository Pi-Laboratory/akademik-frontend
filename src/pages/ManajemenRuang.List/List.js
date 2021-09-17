import { Checkbox, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, selectedItem, dispatchSelectedItem } = useList();

  const fetchList = useCallback(async () => {
    setItems(null);
    try {
      const res = await client["rooms"].find({
        query: {
          $select: ["id", "name", "capacity", "code", "type"]
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
  }, [client]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchList();
  }, [fetchList]);

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
      {items && items.map((value) => {
        return (
          <ListGroup.Item key={value["id"]}>
            <Flex>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox
                  checked={selectedItem.indexOf(value["id"]) !== -1}
                  onChange={(e) => {
                    console.log(e.target.checked);
                    dispatchSelectedItem({
                      type: "toggle",
                      data: {
                        name: value["id"],
                        value: e.target.checked
                      }
                    })
                  }} />
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box>
                  <Link to={`/manajemen-ruang/${value["id"]}`}>
                    {value["name"]}
                  </Link>
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  {value["code"]}
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box sx={{ color: "gray.5" }}>
                  Tipe
                </Box>
                <Box>
                  {value["type"]}
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1, mr: 3 }}>
                <Box sx={{ color: "gray.5" }}>
                  Kapasitas
                </Box>
                <Box>
                  {value["capacity"]} orang
                </Box>
              </Box>
            </Flex>
          </ListGroup.Item>
        )
      })}
    </>
  )
}

export default List;