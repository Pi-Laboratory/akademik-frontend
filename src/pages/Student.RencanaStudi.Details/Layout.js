import { Classes, HTMLTable } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import DialogHapus from "./Dialog.HapusMatakuliah";
import DialogMatakuliah from "./Dialog.TambahMatakuliah";
import List from "./List";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const history = useHistory();
  const [studyDetail, setStudyDetail] = useState(null);
  const { selectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["studies"].get(params["study_id"], {
          query: {
            $select: ["id", "semester", "study_plans", "study_results"],
            $include: [{
              model: "study_plans",
              // $select: ["id"],
              $include: [{
                model: "subject_lecturers",
                $select: ["id"],
                $include: [{
                  model: "subjects",
                  $select: ["id", "stotal"]
                }]
              }]
            }, {
              model: "study_results",
              // $select: ["id"]
            }]
          }
        });
        res["stotal"] = res["study_plans"].reduce((p, c) => {
          return p + c["subject_lecturer"]["subject"]["stotal"];
        }, 0);
        setStudyDetail(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, params["student_id"]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <h4 className={Classes.HEADING}>Ringkasan</h4>
      {studyDetail &&
        <HTMLTable striped={true}>
          <tbody>
            {[
              ["Semester", studyDetail["semester"]],
              ["Mata Kuliah", studyDetail["study_plans"].length],
              ["SKS", studyDetail["stotal"]],
            ].map((value) => (
              <tr key={value[0]}>
                <td>
                  <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                </td>
                <td>{value[1]}</td>
              </tr>))}
          </tbody>
        </HTMLTable>}
      <Box sx={{ mt: 4 }}>
        <h4 className={Classes.HEADING}>Matakuliah</h4>
      </Box>
      {studyDetail &&
        <ListGroup
          sx={{
            [`.${Classes.CHECKBOX}`]: {
              m: 0
            }
          }}
        >
          <ListGroup.Header>
            <Flex sx={{ alignItems: "center" }}>
            </Flex>
          </ListGroup.Header>
          <List />
          <DialogMatakuliah
            data={{
              "student_id": client.account["student_id"],
              "study_program_id": studyDetail["study_program_id"],
              "study_id": studyDetail["id"]
            }}
            isOpen={dialogOpen === "add-subject"}
            onClose={() => { setDialogOpen(null) }}
            onSubmitted={() => {
              history.go(0);
            }}
          />
          <DialogHapus
            data={selectedItem}
            isOpen={dialogOpen === "delete-subject"}
            onClose={() => { setDialogOpen(null) }}
            onSubmitted={() => {
              history.go(0);
            }}
          />
        </ListGroup>}
    </Box >
  )
}

export default Layout;