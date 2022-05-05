import { NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MahasiswaList = () => {
  const client = useClient();
  const { items, setItems, paging, setPaging, filter } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["students"].find({
          query: {
            "class_id": filter["class_id"],
            $select: ["id", "nim", "name", "generation"],
            $skip: paging.skip,
            $sort: {
              name: 1
            }
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
    <ListGroup>
      <ListGroup.Header>
        <Flex>
          <Box sx={{ flexGrow: "1" }} />
        </Flex>
      </ListGroup.Header>
      {items === null &&
        <Box sx={{ p: 2 }}>
          <Spinner size={50} />
        </Box>
      }
      {items && items.length === 0 &&
        <Box sx={{ p: 3 }}>
          <NonIdealState
            title="Kosong"
            description={"Pindahkan Mahasiswa Kesini"}
          />
        </Box>
      }
      {items && items.map((item) => (
        <ListGroup.Item key={item["id"]}>
          <Flex>
            <Box sx={{ width: "20%", flexShrink: 0 }}>
              {item["nim"]}
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                <Link to={`/mahasiswa/${item["id"]}`}>
                  {item["name"]}
                </Link>
              </Box>
            </Box>
            <Box sx={{ width: "20%", flexShrink: 0 }}>
              {item["generation"]}
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default MahasiswaList;