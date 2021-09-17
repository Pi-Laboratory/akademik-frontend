import { Classes, H3, HTMLTable } from "@blueprintjs/core";
import { AspectRatio, Box, Divider, Flex, useClient } from "components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["rooms"].get(params.id);
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
      <HTMLTable striped={true}>
        <tbody>
          <tr>
            <td>
              <Box sx={{ color: "gray.4" }}>Kode</Box>
            </td>
            <td>{item["code"]}</td>
          </tr>
          <tr>
            <td>
              <Box sx={{ color: "gray.4" }}>Nama</Box>
            </td>
            <td>{item["name"]}</td>
          </tr>
          <tr>
            <td>
              <Box sx={{ color: "gray.4" }}>Tipe</Box>
            </td>
            <td>{item["type"]}</td>
          </tr>
          <tr>
            <td>
              <Box sx={{ color: "gray.4" }}>Kapasitas</Box>
            </td>
            <td>{item["capacity"]}</td>
          </tr>
        </tbody>
      </HTMLTable>
    </Box>
  )
}

export default Layout;