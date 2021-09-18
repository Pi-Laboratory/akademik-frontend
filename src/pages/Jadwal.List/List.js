import { Checkbox, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, CONSTANTS, Flex, ListGroup, useClient, useList } from "components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["schedules"].find({
          query: {
            $select: ["id", "day"],
            $include: [{
              model: "subjects",
              $select: ["id", "name", "code"],
              $include: [{
                model: "study_programs",
                $select: ["id", "name"]
              }]
            }, {
              model: "classes",
              $select: ["id", "name"]
            }, {
              model: "lecturers",
              $select: ["id", "name", "nip"]
            }, {
              model: "hours",
              $select: ["id", "start", "end"]
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
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                {CONSTANTS["DAYS"][item["day"]]}
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {moment(item["hour"]["start"], "HH:mm:ss").format("HH:mm")} - {moment(item["hour"]["end"], "HH:mm:ss").format("HH:mm")}
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box sx={{ color: "gray.5" }}>
                Kelas
              </Box>
              <Box>
                <Link to={`kelas`}>
                  {item["class"]["name"]}
                </Link>
              </Box>

            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                <Link to={`/staff-dan-pengajar/${item["lecturer"]["nip"]}`}>
                  {item["lecturer"]["name"]}
                </Link>
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["lecturer"]["nip"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                <Link to={`/kurikulum/mata-kuliah/${item["subject"]["id"]}`}>
                  {item["subject"]["name"]}
                </Link>
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["subject"]["code"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              {item["subject"]["study_program"]["name"]}
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;