import { Button, Checkbox, Classes, FormGroup, HTMLSelect, HTMLTable } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import DialogMatakuliah from "./Dialog.TambahMatakuliah";
import DialogHapusMatakuliah from "./Dialog.HapusMatakuliah";
import DialogRencanaStudiBaru from "./Dialog.TambahStudi";
import List from "./List";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const history = useHistory();
  const [studyDetail, setStudyDetail] = useState(null);
  const { filter, setFilter, status, selectedItem, dispatchSelectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["studies"].get(params["study_id"], {
          query: {
            $select: ["id", "semester", "study_plans", "study_results"],
            $include: [{
              model: "study_plans",
              $select: ["id"],
            }, {
              model: "study_results",
              // $select: ["id"]
            }]
          }
        });
        console.log(res);
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
              ["SKS", 22],
              ["IPK", 24],
            ].map((value) => (
              <tr key={value[0]}>
                <td>
                  <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                </td>
                <td>{value[1]}</td>
              </tr>))}
          </tbody>
        </HTMLTable>}
      <h4 className={Classes.HEADING}>Hasil Studi</h4>
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
              <Box sx={{ flexGrow: 1 }} />
            </Flex>
          </ListGroup.Header>
          <List />
        </ListGroup>}
    </Box >
  )
}

export default Layout;