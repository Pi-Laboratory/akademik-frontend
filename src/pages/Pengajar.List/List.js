import { Checkbox, Icon, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components"
import { Link } from "react-router-dom";
import { useEffect } from "react";

const List = () => {
  const client = useClient();
  const { items, setItems, filter, paging, setPaging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);

      try {
        const res = await client["lecturers"].find({
          query: {
            "study_program_id": filter["study_program_id"] || undefined,
            "name": filter["name"] ? {
              $iLike: `%${filter["name"]}%`
            } : undefined,
            $sort: { id: -1 },
            $skip: paging.skip,
            $select: ["id", "nidn", "certified"],
            $include: [{
              model: "employees",
              $select: ["name", "front_degree", "back_degree"]
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
  }, [client, paging.skip, filter, setPaging, setItems]);
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
            <Box sx={{ flexGrow: 1, px: 2, mr: 3 }}>
              <Flex sx={{ alignItems: "center" }}>
                <Box sx={{ mr: 1 }}>
                  {item["employee"] &&
                    <Link to={`/pengajar/${item["id"]}`}>
                      {`${item["employee"]["front_degree"] || ""} ${item["employee"]["name"]} ${item["employee"]["back_degree"] || ""}`}
                    </Link>}
                </Box>
                {item["certified"] &&
                  <Box as={Icon} sx={{ color: "green.4" }} iconSize={12} icon="endorsed" />}
              </Flex>
              <Box sx={{ color: "gray.5" }}>
                {item["nidn"]}
              </Box>
            </Box>
            {item["study_program"] &&
              <Box sx={{ width: "35%", mr: 3 }}>
                <Box sx={{ color: "gray.5" }}>
                  Program Studi
                </Box>
                <Box>
                  {item["study_program"]["name"]}
                </Box>
              </Box>}
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;