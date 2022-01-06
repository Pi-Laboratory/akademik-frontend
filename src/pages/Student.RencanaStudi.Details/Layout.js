import { AnchorButton, Button, Callout, Checkbox, Classes, HTMLTable } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import { forwardRef, useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import DialogHapus from "./Dialog.HapusMatakuliah";
import DialogMatakuliah from "./Dialog.TambahMatakuliah";
import List from "./List";

const PrintButton = forwardRef((props, ref) =>
  <AnchorButton
    {...props}
    ref={ref}
    navigate={undefined}
  />
);

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const [studyDetail, setStudyDetail] = useState(null);
  const { status, selectedItem, dispatchSelectedItem } = useList();
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
              ["SKS Maksimum", 24],
            ].map((value) => (
              <tr key={value[0]}>
                <td>
                  <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                </td>
                <td>{value[1]}</td>
              </tr>))}
          </tbody>
        </HTMLTable>}
      <h4 className={Classes.HEADING}>Rencana Studi</h4>
      <Box sx={{ mb: 3 }}>
        <Callout intent="primary">
          Silahkan mengisi KRS Anda.
        </Callout>
        <Callout intent="warning">
          Belum dalam periode pengisian KRS.
        </Callout>
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
              <Box sx={{ flexShrink: 0 }}>
                <Checkbox
                  checked={status.checked}
                  indeterminate={status.indeterminate}
                  onChange={(e) => {
                    dispatchSelectedItem({
                      type: "all",
                      data: e.target.checked
                    })
                  }}
                />
              </Box>
              {selectedItem.length > 0 &&
                <Box sx={{ flexShrink: 0 }}>
                  <Button
                    minimal={true}
                    intent="danger"
                    text={`Delete ${selectedItem.length} selected`}
                    onClick={() => setDialogOpen("delete-subject")}
                  />
                </Box>
              }
              <Box sx={{ flexGrow: 1 }} />
              <Flex sx={{ flexShrink: 0 }}>
                <Box sx={{ mr: 3 }}>

                  <Link
                    to={{
                      pathname: `${location.pathname}/print`
                    }}
                    component={PrintButton}
                    minimal={true}
                    intent="none"
                    title="Print Kartu Rencana Studi"
                    text="Print"
                    icon="print"
                    onClick={() => { }}
                  />
                </Box>
                <Box>
                  <Button
                    intent="primary"
                    text="Tambah Matakuliah"
                    onClick={() => setDialogOpen("add-subject")}
                  />
                </Box>
              </Flex>
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