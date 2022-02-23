import { Button, ButtonGroup, Classes, HTMLTable } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Pagination, useClient, useList } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DialogEdit from "./Dialog.Edit";
import Filter from "./Filter";
import { usePage } from "./hoc";
import List from "./List";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const { paging, setPaging, items } = useList();
  const [pageState, setPageState] = usePage();
  const [dialogOpen, setDialogOpen] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["subject-lecturers"].get(params["subject_lecturer_id"], {
          query: {
            // $select: ["id", "name", "code"],
            $include: [{
              model: "subjects",
              $select: ["id", "name", "code"],
            }, {
              model: "lecturers",
              $select: ["id", "employee_id"],
              $include: [{
                model: "employees",
                $select: ["id", "front_degree", "name", "back_degree",]
              }]
            }]
          }
        });
        setPageState(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, params]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <Flex sx={{ mb: 3, mx: -2 }}>
        <Box sx={{ mx: 2 }}>
          <h4 className={Classes.HEADING}>Ringkasan</h4>
          {pageState &&
            <HTMLTable striped={true}>
              <tbody>
                {[
                  ["Mata Kuliah", pageState["subject"]["name"]],
                  ["Kode", pageState["subject"]["code"]],
                ].map((value, idx) => (
                  <tr key={idx}>
                    <td>
                      <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                    </td>
                    <td>{value[1]}</td>
                  </tr>
                ))}
              </tbody>
            </HTMLTable>}
        </Box>
        <Box sx={{ mx: 2 }}>
          <Flex sx={{ justifyContent: "space-between" }}>
            <h4 className={Classes.HEADING}>Bobot Penilaian</h4>
            <Box>
              <Button
                small={true}
                minimal={true}
                text="Edit"
                onClick={() => { setDialogOpen("edit"); }}
              />
            </Box>
          </Flex>
          {pageState &&
            <HTMLTable striped={true}>
              <tbody>
                {[
                  ["Kehadiran", `${pageState["presence_weight"]}%`],
                  ["Tugas", `${pageState["task_weight"]}%`],
                  ["Ujian Tengah Semester", `${pageState["mid_test_weight"]}%`],
                  ["Ujian Akhir Semester", `${pageState["final_test_weight"]}%`],
                ].map((value, idx) => (
                  <tr key={idx}>
                    <td>
                      <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                    </td>
                    <td>{value[1]}</td>
                  </tr>
                ))}
              </tbody>
            </HTMLTable>}
        </Box>
      </Flex>
      <Box sx={{ mb: 3 }}>
        <Filter />
      </Box>
      <ListGroup sx={{
        width: "100%",
        [`.${Classes.CHECKBOX}`]: {
          m: 0
        }
      }}>
        <ListGroup.Header>
          <Flex sx={{ alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexShrink: 0 }}>

              <ButtonGroup>
                <Button active={true} text="Lulus" />
                <Button text="Belum Lulus" />
              </ButtonGroup>
            </Box>
          </Flex>
        </ListGroup.Header>
        <List />
      </ListGroup>
      {pageState !== null &&
        <DialogEdit
          isOpen={dialogOpen === "edit"}
          onClose={() => { setDialogOpen(null) }}
          onSubmitted={(val) => {
            setPageState((s) => {
              return {
                ...s,
                "presence_weight": val["presence_weight"],
                "task_weight": val["task_weight"],
                "mid_test_weight": val["mid_test_weight"],
                "final_test_weight": val["final_test_weight"],
              }
            });
          }}
        />}
      <Pagination
        loading={items === null}
        total={paging.total}
        limit={paging.limit}
        skip={paging.skip}
        onClick={({ page, skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Box >
  )
}

export default Layout;