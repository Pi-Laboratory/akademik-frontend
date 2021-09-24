import { Classes, HTMLTable } from "@blueprintjs/core";
import { AspectRatio, Box, Divider, Flex, useClient } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["lecturers"].get(params.id, {
          query: {
            $select: ["certified", "nidn", "status", "employee", "study_program"],
            $include: [{
              model: "employees",
              $select: ["id", "nip", "name", "gender", "front_degree", "back_degree"],
            }, {
              model: "study_programs",
              $select: ["id", "name"]
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
    <Flex sx={{ px: 3 }}>
      <Box sx={{ py: 4, flexGrow: 1 }}>
        <Box sx={{ mb: 3 }}>
          <h4 className={Classes.HEADING}>Ringkasan</h4>
          {item &&
            <HTMLTable striped={true}>
              <tbody>
                {[
                  ["NIDN", item["nidn"]],
                  ["Program Studi", item["study_program"]["name"]],
                  ["Status", item["status"]],
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
        <h4 className={Classes.HEADING}>Informasi Pegawai</h4>
        {item && item["employee"] &&
          <HTMLTable striped={true}>
            <tbody>
              {[
                ["NIP", item["employee"]["nip"]],
                [
                  "Nama Lengkap",
                  <Link
                    to={`/pegawai/${item["employee"]["id"]}`}
                  >
                    {`${item["employee"]["front_degree"] || ""}${item["employee"]["name"]}${item["employee"]["back_degree"] || ""}`}
                  </Link>
                ],
                ["Jenis Kelamin", item["employee"]["gender"]]
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
      <Divider vertical={true} />
      <Box sx={{ pt: 4, px: 2, width: 350, flexShrink: 0 }}>
        <Box className={`${Classes.CARD}`} sx={{ p: 2, mb: 2, width: 250 }}>
          <AspectRatio ratio="1:1">
            <Box
              as="img"
              sx={{ width: "100%", height: "100%", display: "block" }}
              src="https://source.unsplash.com/random/180x180"
            />
          </AspectRatio>
        </Box>
        <Box sx={{ fontSize: 3, mb: 2 }}>
          {item && item["employee"] && `${item["employee"]["front_degree"] || ""}${item["employee"]["name"]}${item["employee"]["back_degree"] || ""}`}
        </Box>
        <Box sx={{ fontWeight: "bold", color: "gray.6" }}>
          {item && item["employee"] && item["employee"]["nip"]}
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout;