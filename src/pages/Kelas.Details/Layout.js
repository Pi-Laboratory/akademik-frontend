import { Classes, HTMLTable } from "@blueprintjs/core";
import { Box, useClient } from "components";
import { useInject } from "components/inject";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Mahasiswa from "./Mahasiswa";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const inject = useInject();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["classes"].get(params.id, {
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
        inject.setState(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{
      mt: 3,
      px: 3
    }}>
      <Box sx={{ mb: 4 }}>
        <h4 className={Classes.HEADING}>Ringkasan</h4>
        {inject.state &&
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
                  ["Nama", inject.state["name"]],
                  ["Program Studi", <Link to={`/divisi-pendidikan/program-studi/${inject.state["study_program"]["id"]}`}>{inject.state["study_program"]["name"]}</Link>],
                  ["Jurusan", <Link to={`/divisi-pendidikan/jurusan/${inject.state["study_program"]["major"]["id"]}`}>{inject.state["study_program"]["major"]["name"]}</Link>],
                ].map((value, idx) => (
                  <tr key={idx}>
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
      <Mahasiswa />
    </Box>
  )
}

export default Layout;