import { Checkbox, Classes, HTMLTable, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient } from "components";
import { useEffect, useState } from "react";
import { Pagination } from "components/Pagination";
import { useParams } from "react-router";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["majors"].get(params.id);
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
              <Box sx={{ color: "gray.4" }}>Nama</Box>
            </td>
            <td>{item["name"]}</td>
          </tr>
        </tbody>
      </HTMLTable>
    </Box >
  )
}

export default Layout;