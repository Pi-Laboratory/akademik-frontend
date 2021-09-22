import { Checkbox, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const List = () => {
  const client = useClient();
  const { items, setItems, paging, setPaging, filter, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["subjects"].find({
          query: {
            "study_program_id": filter["study_program_id"] || undefined,
            $select: ["id", "code", "name", "semester", "created_at"],
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
  }, [client, paging.skip, filter, setItems, setPaging]);

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

            <Box sx={{ width: "15%", flexGrow: 1, mr: 3 }}>
              <Box>
                <Link to={`${item["id"]}`}>
                  {item["name"]}
                </Link>
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["code"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box sx={{ color: "gray.5" }}>
                Semester
              </Box>
              <Box>
                {item["semester"]} <Box as="span" sx={{ color: "gray.5" }}>{Number(item["semester"]) % 2 ? "Gasal" : "Genap"}</Box>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                3
              </Box>
              <Box sx={{ color: "gray.5" }}>
                SKS
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                3
              </Box>
              <Box sx={{ color: "gray.5" }}>
                Jam
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              Teori
            </Box>

          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;