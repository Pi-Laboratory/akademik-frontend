import { NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, CONSTANTS, Flex, ListGroup, useClient, useList } from "components";
import { Fragment, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, filter } = useList();

  useEffect(() => {
    const fetch = async () => {
      try {
        let querySubjects = {
          model: "subjects",
          $select: ["id", "name", "code", "semester", "study_program_id"],
          $where: (filter["name"] || filter["study_program_id"]) ? {
            "name": filter["name"] ? {
              $iLike: `%${filter["name"]}%`
            } : undefined,
            "study_program_id": filter["study_program_id"] ? filter["study_program_id"] : undefined,
          } : undefined,
          $include: [{
            model: "study_programs",
            $select: ["id", "name"],
          }],
        }
        const res = await client["subject-lecturers"].find({
          query: {
            "lecturer_id": filter["lecturer_id"],
            $select: ["id", "subject_id", "lecturer_id", "mid_test_weight", "presence_weight", "task_weight", "final_test_weight"],
            $include: [querySubjects, {
              model: "lecturers",
              $select: ["id", "employee_id"],
              $include: [{
                model: "employees",
                $select: ["id", "front_degree", "name", "back_degree",]
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
  }, [client, setItems, setPaging, filter]);

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
            <Box sx={{ flexShrink: 0, mr: 3, width: `20%` }}>
              {item["hours"].map((hour, idx) => {
                return (
                  <Fragment key={idx}>
                    <Box>
                      {CONSTANTS["DAYS"][hour["day"]]}
                    </Box>
                    <Box sx={{ color: "gray.5" }}>
                      {moment(hour["start"], "HH:mm:ss").format("HH:mm")} - {moment(hour["end"], "HH:mm:ss").format("HH:mm")}
                    </Box>
                  </Fragment>
                )
              })}
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 3}%` }}>
              <Link to={`/penilaian/jadwal/${item["id"]}`}>
                {item["subject"]["name"]}
              </Link>
              <Box sx={{ color: "gray.5" }}>
                {item["subject"]["code"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, width: `${100 / 3}%` }}>
              {item["subject"]["study_program"]["name"]}
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;