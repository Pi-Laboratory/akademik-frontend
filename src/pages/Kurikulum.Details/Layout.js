import { Classes, HTMLTable } from "@blueprintjs/core";
import { Box, useClient } from "components";
import ListProvider from "components/list";
import { useInject } from "components/inject";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import MataKuliahList from "./MataKuliah.List";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const inject = useInject();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["curriculums"].get(params.id, {
          query: {
            $include: [{
              model: "study_programs",
              $select: ["id", "name"],
              $include: [{
                model: "majors",
                $select: ["id", "name"],
              }]
            }]
          }
        });
        setItem(res);
        inject.setState(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, params.id, inject]);

  return (
    <Box sx={{
      mt: 3,
      px: 3
    }}>
      <Box sx={{ mb: 4 }}>
        <h4 className={Classes.HEADING}>Ringkasan</h4>
        {item &&
          <Box
            sx={{
              "> table": {
                minWidth: "350px",
              }
            }}
          >
            <HTMLTable striped={true}>
              <tbody>
                {[
                  ["Nama", item["name"]],
                  ["Tahun", item["year"]],
                  ["Program Studi", <Link to={`/divisi-pendidikan/program-studi/${item["id"]}`}>{item["study_program"]["name"]}</Link>],
                ].map((value) => (
                  <tr key={value[0]}>
                    <td>
                      <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                    </td>
                    <td>{value[1]}</td>
                  </tr>))}
              </tbody>
            </HTMLTable>
          </Box>
        }
      </Box>
      <h4 className={Classes.HEADING}>Mata Kuliah</h4>
      <ListProvider
        filter={{
          "curriculum_id": params.id,
          "semester": null,
          "type": null,
        }}
      >
        <MataKuliahList />
      </ListProvider>
    </Box>
  )
}

export default Layout;