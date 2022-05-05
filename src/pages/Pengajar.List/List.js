import { NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, ListGroup, useClient, useList } from "components"
import { useEffect } from "react";
import { useDebounce } from "components/helper";
import Item from "./Item";

const List = () => {
  const client = useClient();
  const { items, setItems, filter, paging, setPaging } = useList();

  const _f = useDebounce(filter, 200);

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["lecturers"].find({
          query: {
            "study_program_id": _f["study_program_id"] || undefined,
            $sort: { id: -1 },
            $skip: paging.skip,
            $select: ["id", "nidn", "certified", "status"],
            $include: [{
              model: "employees",
              $select: ["name", "front_degree", "back_degree"],
              $where: _f["name"] ? {
                "name": _f["name"] ? {
                  $iLike: `%${_f["name"]}%`
                } : undefined,
              } : undefined
            }, {
              model: "study_programs",
              $select: ["id", "name"]
            }]
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
          }}>
          <Item data={item} />
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;