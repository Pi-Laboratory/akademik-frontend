import { Spinner, Button, Classes, Dialog, H3, NonIdealState } from "@blueprintjs/core";
import { AspectRatio, Box, Divider, Flex, useClient } from "components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DialogIDCard } from "./Dialog.IDCard";
import moment from "moment";

const Layout = () => {
  const client = useClient();
  const params = useParams();
  const [dialogOpen, setDialogOpen] = useState(null);
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
        <Box as={H3}>Informasi Umum</Box>
        {[
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
        <Box sx={{ mt: 3 }}>
          <Button
            text="Lihat ID Card"
            onClick={() => {
              setDialogOpen("id-card");
            }}
          />
          <Dialog
            isOpen={dialogOpen === "id-card"}
            onClose={() => setDialogOpen(null)}
            title="ID Card Mahasiswa"
          >
            <DialogIDCard
              data={data}
              onClose={() => setDialogOpen(null)}
            />
          </Dialog>
        </Box>
      </Box>
      <Divider vertical={true} />
      <Box sx={{ pt: 4, px: 2, width: 350, flexShrink: 0 }}>
        <Box className={`${Classes.CARD}`} sx={{ p: 2, mb: 2, width: 250 }}>
          <AspectRatio ratio="1:1">
            <Box
              sx={{ width: "100%", height: "100%" }}
            >
              {data["photo"] &&
                <Box
                  as="img"
                  sx={{ width: "100%", height: "100%", display: "block" }}
                  src={data["photo"]}
                />}
              {!data["photo"] &&
                <NonIdealState
                  icon="graph-remove"
                  title="No Photo"
                />}
            </Box>
          </AspectRatio>
        </Box>
        <Box sx={{ fontSize: 3, mb: 2 }}>
          {data["name"]}
        </Box>
        <Box sx={{ fontWeight: "bold", color: "gray.6" }}>
          {data["nim"]}
        </Box>
        {[
          ["Telepon", data["phone_number"]],
          ["Email", data["email"]],
        ].map((item, idx) => (
          <Flex key={idx} sx={{ mt: 3 }}>
            <Box sx={{ width: "50%", flexShrink: 0, fontWeight: "bold", color: "gray.6" }}>
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

export default Layout;