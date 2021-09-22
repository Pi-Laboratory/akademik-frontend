import { Classes, HTMLTable } from "@blueprintjs/core";
import { Box, useClient } from "components";
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
        const res = await client["subjects"].get(params.id, {
          query: {
            $include: [{
              model: "curriculums",
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
    <Box sx={{ mt: 3, px: 3 }}>
      <h4 className={Classes.HEADING}>Ringkasan</h4>
      {item &&
        <HTMLTable striped={true}>
          <tbody>
            {[
              ["Nama", item["name"]],
              ["Kode", item["code"]],
              ["Tipe", item["type"]],
              ["Kurikulum", <Link to={`/kurikulum/${item["curriculum"]["id"]}`}>{item["curriculum"]["name"]}</Link>],
            ].map((value) => (
              <tr key={value[0]}>
                <td>
                  <Box sx={{ color: "gray.4" }}>{value[0]}</Box>
                </td>
                <td>{value[1]}</td>
              </tr>))}
          </tbody>
        </HTMLTable>}
    </Box>
  )
}

export default Layout;