import { Classes, HTMLTable, Spinner } from "@blueprintjs/core";
import { Box, Flex, useClient } from "components";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["registrations"].get(params["student_id"], {
          query: {
            $select: [
              "id",
              "full_name",
              "address",
              "birth_place",
              "birth_date",
              "phone_number",
              "school_name",
              "school_address",
              "nisn",
              "photo",
            ],
          }
        });
        setItem(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    fetch();
  }, [client, params["student_id"]]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <Spinner />
    )
  }

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <Flex
        sx={{
          width: "100%",
          flexDirection: "row-reverse"
        }}
      >
        <Box sx={{ flexShrink: 0 }} >
          <Box sx={{
            borderRadius: 4,
            border: "1px solid white",
            borderColor: "gray.3",
            width: "150px",
            overflow: "hidden",
            backgroundColor: "gray.3"
          }}>
            <Box
              as="img"
              alt={`Wajah ${item["full_name"]}`}
              sx={{
                display: "block",
                width: "100%"
              }}
              src={item["photo"]}
            />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} >
          <Box>
            <h4 className={Classes.HEADING}>Ringkasan</h4>
            {item &&
              <HTMLTable striped={true}>
                <tbody>
                  {[
                    ["Nama", item["full_name"]],
                    ["Alamat", item["address"]],
                    ["Tempat Tanggal Lahir", `${item["birth_place"]}, ${moment(item["birth_date"]).format("DD MMMM YYYY")}`],
                    ["Nomor Telephone", item["phone_number"]],
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
          <Box sx={{ mt: 3 }}>
            <h4 className={Classes.HEADING}>Asal Sekolah</h4>
            {item &&
              <HTMLTable striped={true}>
                <tbody>
                  {[
                    ["Nama Sekolah", item["school_name"]],
                    ["Alamat Sekolah", item["school_address"]],
                    ["NISN", item["nisn"]],
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
        </Box>
      </Flex>

    </Box >
  )
}

export default Layout;