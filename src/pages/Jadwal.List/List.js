import { NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, ListGroup, useClient, useList } from "components";
import { useDebounce } from "components/helper";
import { useEffect } from "react";
import Item from "./Item";

const List = () => {
  const client = useClient();
  const { filter, items, setItems, setPaging } = useList();

  const _f = useDebounce(filter, 200);

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const query = {
          $select: ["id", "subject_id", "lecturer_id", "mid_test_weight", "presence_weight", "task_weight", "final_test_weight"],
          $include: [{
            model: "subjects",
            $select: ["id", "name", "code", "semester", "study_program_id"],
            $where: _f["name"] ? {
              name: {
                $iLike: `%${_f["name"]}%`
              }
            } : undefined,
            $include: [{
              model: "study_programs",
              $select: ["id", "name"],
            }]
          }, {
            model: "lecturers",
            $select: ["id", "nidn"],
            $include: [{
              model: "employees",
              $select: ["id", "nip", "front_degree", "name", "back_degree",]
            }]
          }, {
            model: "hours",
            $select: ["id", "day", "start", "end"]
          }]
        }
        const res = await client["subject-lecturers"].find({ query });
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
  }, [client, _f, setItems, setPaging]);

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
          <Item data={item} />
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;