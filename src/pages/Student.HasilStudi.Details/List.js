import { Checkbox, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, CONSTANTS, Flex, ListGroup, useClient, useList } from "components";
import { Link } from "react-router-dom";
import { Fragment, useEffect } from "react";
import moment from "moment";

const List = () => {
  const client = useClient();
  const { items, filter, setItems, setPaging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        console.log(filter);
        const res = await client["study-plans"].find({
          query: {
            "study_id": filter["study_id"] || undefined,
            $select: ["id", "study_id", "subject_lecturer_id"],
            $include: [{
              model: "subject_lecturers",
              $select: ["id"],
              $include: [{
                model: "lecturers",
                $select: ["id", "nidn"],
                $include: [{
                  model: "employees",
                  $select: ["id", "front_degree", "name", "back_degree", "nip"]
                }]
              }, {
                model: "subjects",
                $select: ["id", "name", "code", "type", "stotal"]
              }, {
                model: "hours",
                $select: ["id", "day", "start", "end"]
              }]
            }]
          }
        });
        console.log(res.data);
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
  }, [client, setItems, setPaging, filter["study_id"]]); // eslint-disable-line react-hooks/exhaustive-deps

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
      {items && items.map(({ "subject_lecturer": item, id }) => (
        <ListGroup.Item key={id}>
          <Flex>
            <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 4}%` }}>
              <Box>
                <Link to={`/kurikulum/mata-kuliah/${item["subject"]["id"]}`}>
                  {item["subject"]["name"]}
                </Link>
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["subject"]["code"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 3}%` }}>
              <Box>
                <Link to={`/staff-dan-pengajar/${item["lecturer"]["employee"]["nip"]}`}>
                  {item["lecturer"]["employee"]["name"]}
                </Link>
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["lecturer"]["employee"]["nip"]}
              </Box>
            </Box>
            {[
              ["Kehadiran", "65"],
              ["Tugas", "43"],
              ["UTS", "87"],
              ["UAS", "100"],
              ["Predikat", "B+"],
            ].map((v) =>
              <Box sx={{ flexGrow: 1, width: `${100 / 5}%` }}>
                <Box sx={{ color: "gray.5" }}>{v[0]}</Box>
                <div>{v[1]}</div>
              </Box>)}
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;