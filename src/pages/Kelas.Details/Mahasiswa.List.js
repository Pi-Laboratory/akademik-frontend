import { AnchorButton, Button, Checkbox, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient, useList } from "components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const List = () => {
  const client = useClient();
  const { items, setItems, paging, setPaging, filter, setFilter, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["students"].find({
          // query: {
          //   $select: ["id", "code", "name", "major_id", "semester", "created_at"],
          //   $skip: paging.skip,
          //   "curriculum_id": filter["curriculum_id"]
          // }
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
              placeholder="Semester"
              value={filter["semester"]}
              onChange={({ value }) => {
                setFilter(filter => ({ ...filter, semester: value }));
              }}
              options={[
                { label: "Gasal", value: 0 },
                { label: "Genap", value: 1 }
              ]}
            />
            <Select
              minimal={true}
              placeholder="Tipe"
              value={filter["type"]}
              onChange={({ value }) => {
                setFilter(filter => ({ ...filter, type: value }));
              }}
              options={[
                { label: "Teori", value: 0 },
                { label: "Praktek", value: 1 },
                { label: "Teori & Praktek", value: 2 }
              ]}
            />
            {(filter["type"] !== null || filter["semester"] !== null) &&
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
            description={(
              <Link
                to={{
                  pathname: "/mahasiswa",
                  search: "?d=add"
                }}
                component={AnchorButton}
                small={true}
                minimal={true}
                intent="primary"
                text="Tambah Mahasiswa"
              />
            )}
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
            <Box sx={{ flexGrow: 1 }}>
              {item["generation"]}
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default List;