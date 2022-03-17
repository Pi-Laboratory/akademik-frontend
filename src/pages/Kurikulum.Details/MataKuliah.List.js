import { AnchorButton, Button, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Pagination, Select, useClient, useList } from "components";
import { Link } from "react-router-dom";
import { forwardRef, useEffect } from "react";

const btn = forwardRef((props, ref) =>
  <AnchorButton
    {...props}
    ref={ref}
    navigate={undefined}
  />
);

const List = () => {
  const client = useClient();
  const { items, setItems, paging, setPaging, filter, setFilter } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["subjects"].find({
          query: {
            $select: ["id", "code", "name", "semester", "created_at"],
            $skip: paging.skip,
            "curriculum_id": filter["curriculum_id"]
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
                    pathname: "/mata-kuliah",
                    search: "?d=add"
                  }}
                  component={btn}
                  small={true}
                  minimal={true}
                  intent="primary"
                  text="Tambah Mata Kuliah"
                />
              )}
            />
          </Box>
        }
        {items && items.map((item) => (
          <ListGroup.Item key={item["id"]}>
            <Flex>
              <Box sx={{ width: "15%", flexGrow: 1, mr: 3 }}>
                <Box>
                  <Link to={`/mata-kuliah/${item["id"]}`}>
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
                  <span>{item["semester"]}</span>
                  <Box as="span" sx={{ color: "gray.5" }}>
                    {Number(item["semester"]) % 2 ? " Gasal" : " Genap"}
                  </Box>
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
              <Box sx={{ flexGrow: 1 }}>
                Teori
              </Box>
            </Flex>
          </ListGroup.Item>
        ))}
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
    </>
  )
}

export default List;