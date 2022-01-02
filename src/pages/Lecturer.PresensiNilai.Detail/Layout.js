import { Button, Classes, HTMLTable } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Pagination, Select, useClient, useList } from "components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Filter from "./Filter";
import { usePage } from "./hoc";
import List from "./List";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const { paging, setPaging, items } = useList();
  const [pageState, setPageState] = usePage();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["subject-lecturers"].get(params["subject_id"], {
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
        console.log(res);
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

              <Select
                minimal={true}
                label="Program Studi"
                options={[
                  { label: "Teologi", value: 0 },
                  { label: "Teknik Elektro", value: 0 },
                  { label: "Teknik Arsitektur", value: 1 },
                  { label: "Akuntansi", value: 2 },
                  { label: "Teknik Sipil", value: 3 },
                  { label: "Bahasa Inggris", value: 3 },
                ]}
              />
            </Box>
          </Flex>
        </ListGroup.Header>
        <List />
      </ListGroup>
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