import { Classes, HTMLTable } from "@blueprintjs/core";
import { Box, useClient } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Mahasiswa from "./Mahasiswa";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [item, setItem] = useState(null);

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
        setItem(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, params.id]);

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
                  ["Program Studi", <Link to={`/divisi-pendidikan/program-studi/${item["study_program"]["id"]}`}>{item["study_program"]["name"]}</Link>],
                  ["Jurusan", <Link to={`/divisi-pendidikan/jurusan/${item["study_program"]["major"]["id"]}`}>{item["study_program"]["major"]["name"]}</Link>],
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