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
  const [item, setItem] = useState(null);
  const [studies, setStudies] = useState([]);
  const { filter, setFilter, status, selectedItem, dispatchSelectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["students"].get(params["student_id"], {
          query: {
            $select: ["id", "name", "nim", "current_semester", "studies", "study_program_id"],
            $include: [{
              model: "studies",
              $select: ["id", "semester"]
            }]
          }
        });
        setItem(res);
        setStudies(res["studies"]);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, params.id]);

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <h4 className={Classes.HEADING}>Ringkasan</h4>
      {item &&
        <HTMLTable striped={true}>
          <tbody>
            {[
              ["Nama", item["name"]],
              ["NIM", item["nim"]],
              ["Semester", item["current_semester"]],
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
      <Flex>
        <Box sx={{ flexGrow: 1 }}>
          <FormGroup
            label="Semester"
            inline={true}
          >
            <HTMLSelect
              value={filter["study_id"]}
              onChange={(v) => {
                setFilter(f => ({
                  ...f,
                  "study_id": v.target.value
                }));
              }}
              options={[{
                disabled: true,
                label: "Pilih",
                value: ""
              }, ...studies.map(({ id, semester }) => {
                return {
                  label: `${semester}`,
                  value: id
                }
              })]}
            />
          </FormGroup>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <Button
            minimal={true}
            text="Generate Rencana Studi Baru"
            intent="primary"
            onClick={() => setDialogOpen("add-study")}
          />
          <DialogRencanaStudiBaru
            data={{
              "student_id": params["student_id"]
            }}
            isOpen={dialogOpen === "add-study"}
            onClose={() => { setDialogOpen(null) }}
            onSubmitted={() => {
              history.go(0);
            }}
          />
        </Box>
      </Flex>
      {item && (filter["study_id"] !== "") &&
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
              <Box sx={{ flexShrink: 0 }}>
                <Button
                  intent="primary"
                  text="Tambah Matakuliah"
                  onClick={() => setDialogOpen("add-subject")}
                />
              </Box>
            </Flex>
          </ListGroup.Header>
          <List />
          <DialogMatakuliah
            data={{
              "student_id": params["student_id"],
              "study_program_id": item["study_program_id"],
              "study_id": filter["study_id"]
            }}
            isOpen={dialogOpen === "add-subject"}
            onClose={() => { setDialogOpen(null) }}
            onSubmitted={() => {
              history.go(0);
            }}
          />
          <DialogHapusMatakuliah
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