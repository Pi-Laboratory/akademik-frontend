import { Checkbox, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, paging, filter, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["study-programs"].find({
          query: {
            $sort: {
              "code": 1
            },
            $select: ["id", "name", "code"],
            $skip: paging.skip,
            $include: [{
              model: "majors",
              $select: ["id", "name"]
            }],
            "major_id": filter["major_id"] || undefined
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
  }, [client, paging.skip, setItems, setPaging, filter]);

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
                }} />
            </Box>
            <Box sx={{ flexShrink: 0, mr: 3, width: "46px" }}>
              <Box sx={{ color: "gray.5" }}>
                Kode
              </Box>
              <Box>
                {item["code"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box sx={{ color: "gray.5" }}>
                Program Studi
              </Box>
              <Box>
                <Link
                  to={`/divisi-pendidikan/program-studi/${item["id"]}`}
                >
                  {item["name"]}
                </Link>
              </Box>
            </Box>
            <Box sx={{ width: "25%", mr: 3 }}>
              <Box sx={{ color: "gray.5" }}>
                Jurusan
              </Box>
              <Box>
                <Link
                  to={`/divisi-pendidikan/jurusan/${item["major"]["id"]}`}
                >
                  {item["major"]["name"]}
                </Link>
              </Box>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;