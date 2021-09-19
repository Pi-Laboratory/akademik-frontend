import { Button, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient, useList } from "components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MahasiswaList = () => {
  const client = useClient();
  const { items, setItems, paging, setPaging, filter, setFilter } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["students"].find({
          query: {
            $select: ["id", "nim", "name", "generation"],
            $skip: paging.skip,
            "class_id": filter["class_id"]
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
          <Box>
            <Select
              minimal={true}
              placeholder="Angkatan"
              value={filter["generation"]}
              onChange={({ value }) => {
                setFilter(filter => ({ ...filter, semester: value }));
              }}
              options={[
                { label: "Gasal", value: 0 },
                { label: "Genap", value: 1 }
              ]}
            />
            {(filter["generation"] !== null) &&
              <Button
                minimal={true}
                text="Reset"
                onClick={() => {
                  setFilter(filter => ({
                    ...filter,
                    type: null,
                    semester: null
                  }))
                }}
              />}
          </Box>
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