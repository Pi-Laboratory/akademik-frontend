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
        const res = await client["registrations"].get(params["registraion_id"], {
          query: {
            $select: [
              "id",
              "school_name",
              "school_address",
              "nisn",
              "student"
            ],
            $include: [{
              model: "students",
              $select: [
                "id",
                "name",
                "birth_city",
                "birth_date",
                "phone_number",
                "origin_address",
              ]
            }]
          }
        });
        console.log(res);
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
          mx: -2,
          width: "100%",
          flexDirection: "row-reverse"
        }}
      >
        <Box sx={{ flexShrink: 0, px: 2 }} >
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
              sx={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
              }}
              alt={`Wajah ${item["student"]["name"]}`}
              src={`${client.host.toString()}files/students/${item["student"]["id"]}/photo.jpg`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "https://via.placeholder.com/135x180?text=Tidak ditemukan";
              }}
            />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, px: 2 }} >
          <Box>
            <h4 className={Classes.HEADING}>Ringkasan</h4>
            {item &&
              <HTMLTable striped={true}>
                <tbody>
                  {[
                    ["Nama", item["student"]["name"]],
                    ["Alamat", item["student"]["origin_address"]],
                    ["Tempat Tanggal Lahir", `${item["student"]["birth_city"]}, ${moment(item["student"]["birth_date"]).format("DD MMMM YYYY")}`],
                    ["Nomor Telephone", item["student"]["phone_number"]],
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