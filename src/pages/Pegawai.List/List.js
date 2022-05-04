import { Button, Checkbox, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components"
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDebounce } from "components/helper";

const List = () => {
  const client = useClient();
  const history = useHistory();
  const { items, setItems, filter, paging, setPaging, selectedItem, dispatchSelectedItem } = useList();

  const _f = useDebounce(filter, 200);

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["employees"].find({
          query: {
            $sort: {
              id: -1
            },
            "name": _f["name"] ? {
              $iLike: `%${_f["name"]}%`
            } : undefined,
            $skip: paging.skip,
            $select: ["id", "name", "front_degree", "back_degree", "nip", "id_number"]
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
  }, [client, paging.skip, _f, setPaging, setItems]);
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
        <ListGroup.Item
          key={item["id"]}
          sx={{
            [`.action`]: {
              width: "30px",
              opacity: "0",
              pointerEvents: "none"
            },
            [`&:hover .action`]: {
              opacity: "1",
              pointerEvents: "unset"
            }
          }}
        >
          <Flex>
            <Box sx={{ width: 24, px: 0, flexShrink: 0 }}>
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
            <Flex sx={{ flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1, px: 2, mr: 3 }}>
                <Box>
                  <Link to={`/pegawai/${item["id"]}`}>
                    {`${item["front_degree"] || ""} ${item["name"]} ${item["back_degree"] || ""}`}
                  </Link>
                </Box>
                <Box sx={{ color: "gray.5" }}>
                  {item["nip"]}
                </Box>
              </Box>
              <Box sx={{ width: "25%", mr: 3 }}>
                <Box sx={{ color: "gray.5" }}>
                  NIK
                </Box>
                <Box>
                  {item["id_number"]}
                </Box>
              </Box>
            </Flex>
            <Box className="action">
              <Button
                minimal={true}
                icon="edit"
                onClick={() => {
                  history.push(`/pegawai/${item["id"]}/settings`)
                }}
              />
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;