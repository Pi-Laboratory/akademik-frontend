import { NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, ListGroup, useClient, useList } from "components";
import { useEffect } from "react";
import Item from "./Item";

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging } = useList();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["subject-lecturers"].find({
          query: {
            $select: ["id", "subject_id", "lecturer_id"],
            $include: [{
              model: "subjects",
              $select: ["id", "name", "code", "semester"],
              $include: [{
                model: "study_programs",
                $select: ["id", "name"]
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
  }, [client, setItems, setPaging]);

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