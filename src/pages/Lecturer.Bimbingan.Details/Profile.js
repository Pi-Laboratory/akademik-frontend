import { Spinner, H3 } from "@blueprintjs/core";
import { Box, Divider, Flex, useClient } from "components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Achievements } from "./Achievements";

export const Profile = () => {
  const client = useClient();
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["students"].get(params["id"], {
          query: {
            $include: [{
              model: "study_programs",
              $select: ["id", "name"],
              $include: [{
                model: "majors",
                $select: ["id", "name"]
              }]
            }, {
              model: "preceptors",
              $select: ["id", "achievements"]
            }]
          }
        });
        setData(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  if (data === null) {
    return (<Spinner />)
  }

  return (
    <Flex sx={{ px: 3 }}>
      <Box sx={{ py: 4, flexGrow: 1 }}>
        <Achievements
          studyProgramId={data["study_program_id"]}
          list={data["preceptor"]["achievements"]}
          preceptorId={data["preceptor"]["id"]}
        />
      </Box>
      <Divider vertical={true} />
      <Box sx={{ pt: 4, px: 2, width: 350, flexShrink: 0 }}>
        <Box as={H3}>Informasi Umum</Box>
        {[
          ["Nama", data["name"]],
          ["NIM", data["nim"]],
          ["Telepon", data["phone_number"]],
          ["Email", data["email"]],
          ["Tanggal Lahir", moment(data["birth_date"]).format("DD MMM YYYY")],
          ["Kota Tempat Lahir", data["birth_city"]],
          ["Jenis Kelamin", data["gender"]],
          ["Alamat", data["recent_address"]],
          ["Alamat Asal", data["origin_address"]],
          ["Agama", data["religion"]],
          ["Angkatan", data["generation"]],
          ["Status Nikah", "Belum Menikah"],
        ].map((item, idx) => (
          <Flex key={idx} sx={{ mt: 3 }}>
            <Box sx={{ width: "40%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
              <span>{item[0]}</span>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <span>{item[1]}</span>
            </Box>
          </Flex>
        ))}
      </Box>
    </Flex>
  )
}