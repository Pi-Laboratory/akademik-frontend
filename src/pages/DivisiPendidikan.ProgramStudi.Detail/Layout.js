import { Classes, HTMLTable } from "@blueprintjs/core";
import { Box, useClient } from "components";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(null);
    const fetch = async () => {
      try {
        const res = await client["study-programs"].get(params.id, {
          query: {
            $include: [{
              model: "majors",
              $select: ["id", "name"]
            }]
          }
        });
        setItem(res);
      } catch (err) {
        console.error(err);
        setItem({});
      }
    }
    fetch();
  }, [client, params.id]);

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <h4 className={Classes.HEADING}>Ringkasan</h4>
      <HTMLTable striped={true}>
        <tbody>
          <tr>
            <td>
              <Box sx={{ color: "gray.4" }}>Nama</Box>
            </td>
            <td>{item ? item["name"] : "Fetching"}</td>
          </tr>
          <tr>
            <td>
              <Box sx={{ color: "gray.4" }}>Jurusan</Box>
            </td>
            <td>
              {item ?
                <Link to={`/divisi-pendidikan/jurusan/${item["major"]["id"]}`}>
                  {item["major"]["name"]}
                </Link>
                : "Fetching"}
            </td>
          </tr>
        </tbody>
      </HTMLTable>
    </Box >
  )
}

export default Layout;