import { AnchorButton, Button, Classes, Dialog, Icon } from "@blueprintjs/core";
import { AspectRatio, Box, Flex, useClient } from "components";
import { DialogIDCard } from "./Dialog.IDCard";
import moment from "moment";
import { useMemo, useState } from "react";
import { useStudent } from "."
import { useLocation, useRouteMatch } from "react-router-dom";
import { useNav } from "pages/Root/hoc";
import { joinPropsString } from "components/helper";

export const Header = () => {
  const client = useClient();
  const student = useStudent();
  const { path } = useRouteMatch();
  const navigation = useNav(path);
  const [dialogOpen, setDialogOpen] = useState(null);

  const location = useLocation();

  const isSetting = useMemo(() => {
    return location.pathname.indexOf("settings") !== -1;
  }, [location]);


  return (
    <Flex
      sx={{
        mb: 2,
      }}
    >
      <Box sx={{ width: 150 }}>
        <Box className={`${!student ? Classes.SKELETON : ""} ${Classes.CARD}`} sx={{ p: 2 }}>
          <AspectRatio ratio="1:1">
            <Box
              sx={{ width: "100%", height: "100%" }}
            >
              {student &&
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                  as="img"
                  src={`${client.host.toString()}files/students/${student["id"]}/photo.jpg`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "https://via.placeholder.com/135x180?text=Tidak ditemukan";
                  }}
                />}
            </Box>
          </AspectRatio>
        </Box>
      </Box>
      <Flex sx={{ ml: 3, flexDirection: "column" }}>
        <Box
          className={!student && Classes.SKELETON}
          sx={{ fontSize: 5, mb: 2 }}
        >
          {student && student["name"]}
        </Box>
        <Box
          className={!student && Classes.SKELETON}
          sx={{ fontSize: 3, mb: 2, fontWeight: "bold", color: "gray.6" }}
        >
          {student && student["nim"]}
        </Box>
        <Flex sx={{ fontSize: 2, mb: 2, color: "gray.6", alignItems: "center" }}>
          <Icon icon="heart" iconSize={14} />
          <Box className={!student && Classes.SKELETON} sx={{ ml: 1 }}>
            Lahir tanggal {student && moment(student["birth_date"]).format("DD MMMM YYYY")}
          </Box>
        </Flex>
        <Flex sx={{ fontSize: 2, color: "gray.6", alignItems: "center" }}>
          <Box className={!student && Classes.SKELETON}>
            <Box
              as={Icon}
              sx={{ display: "inline-block", py: "3px", mr: 1 }}
              icon="home" iconSize={14}
            />
            Tinggal di {
              student && joinPropsString(student, [
                "street",
                "neighbor.name",
                "subdistrict.name",
                "district.name",
                "city.name",
                "province.name",
                "postal_code",
              ], ", ")
            }
          </Box>
        </Flex>

      </Flex>
      <Box sx={{ flexGrow: 1 }} />
      <Flex sx={{ flexShrink: 0, whiteSpace: "nowrap" }}>
        {!isSetting &&
          <Box>
            <AnchorButton
              icon="edit"
              text="Edit profile"
              href="/mahasiswa/:id/settings"
              onClick={(e) => {
                e.preventDefault();
                navigation.go("/mahasiswa/:id/settings");
              }}
            />
          </Box>}
        <Box sx={{ ml: 3 }}>
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
              data={student}
              onClose={() => setDialogOpen(null)}
            />
          </Dialog>
        </Box>
      </Flex>
    </Flex>
  )
}