import { AnchorButton, Button, Checkbox, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient, useList } from "components";
import { Link, useParams } from "react-router-dom";
import { useEffect, forwardRef } from "react";
import { Pagination } from "components/Pagination";
import { useTrade } from "./hoc";

const MahasiswaTradeSource = () => {
  const client = useClient();
  const trade = useTrade();
  const params = useParams();
  const { items, setItems, paging, setPaging, filter, setFilter, status, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["students"].find({
          query: {
            $include: [{
              model: "classes",
              $select: ["id", "name"],
            }],
            $select: ["id", "name", "nim", "class_id"],
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
  }, [client, paging.skip, setItems, setPaging, filter]);

  return (
    <>
      <ListGroup sx={{
        width: "100%",
        [`.${Classes.CHECKBOX}`]: {
          m: 0
        }
      }}>
        <ListGroup.Header>
          <Flex sx={{ alignItems: "center" }}>
            <Box sx={{ width: 40, flexShrink: 0, }}>
              <Checkbox
                disabled={trade["lock"]}
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
            {selectedItem.length > 0 &&
              <Box sx={{ ml: -2 }}>
                <Button
                  minimal={true}
                  text={`${selectedItem.length} Item Selected`}
                />
              </Box>}
            <Box sx={{ flexGrow: "1" }} />
            {selectedItem.length === 0 &&
              <Box>
                <Select
                  minimal={true}
                  placeholder="Angkatan"
                  value={filter["generation"]}
                  onChange={({ value }) => {
                    setFilter(filter => ({ ...filter, generation: value }));
                  }}
                  options={Array(10).fill(0).map((_, idx) => {
                    const now = new Date().getFullYear();
                    const value = String(now - idx);
                    return ({ label: value, value: value });
                  })}
                />
                {filter["generation"] !== null &&
                  <Button
                    minimal={true}
                    text="Reset"
                    onClick={() => {
                      setFilter(filter => ({
                        ...filter,
                        generation: null
                      }))
                    }}
                  />}
              </Box>}
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
                  component={forwardRef((props, ref) => (
                    <AnchorButton
                      ref={ref}
                      {...props}
                      navigate={undefined}
                    />
                  ))}
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
                  disabled={trade["lock"] || item["class_id"] === Number(params["id"])}
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

              <Box sx={{ width: "60%", flexShrink: 0 }}>
                <Box>
                  <Link to={`/mahasiswa/${item["id"]}`}>
                    {item["name"]}
                  </Link>
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  {item["nim"]}
                </Box>
              </Box>
              {item["class"] &&
                <Box sx={{ flexGrow: 1, mr: 3 }}>
                  <Box>
                    {item["class_id"] !== Number(params["id"])
                      ? <Link to={`/kelas/${item["class"]["id"]}`}>
                        {item["class"]["name"]}
                      </Link>
                      : "Kelas ini"
                    }
                  </Box>
                </Box>}
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

export default MahasiswaTradeSource;