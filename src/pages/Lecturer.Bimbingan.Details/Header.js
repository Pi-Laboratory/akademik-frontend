import { Button, Classes, Icon } from "@blueprintjs/core";
import { AspectRatio, Box, Flex, useClient } from "components"
import moment from "moment";
import { useStudent } from "."

export const Header = () => {
  const client = useClient();
  const student = useStudent();
  return (
    <Flex
      sx={{
        mb: 2,
      }}
    >
      <Box className={`${Classes.CARD}`} sx={{ p: 2, width: 150 }}>
        <AspectRatio
          ratio="1:1"
          className={!student ? Classes.SKELETON : ""}
        >
          <Box
            sx={{ width: "100%", height: "100%" }}
          >
            {student &&
              <Box
                as="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
                src={`${client.host.toString()}files/students/${student["id"]}/photo.jpg`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "https://via.placeholder.com/135x180?text=Tidak ditemukan";
                }}
              />}
          </Box>
        </AspectRatio>
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
          <Icon icon="home" iconSize={14} />
          <Box className={!student && Classes.SKELETON} sx={{ ml: 1 }}>
            Tinggal di {student && student["origin_address"]}
          </Box>
        </Flex>

      </Flex>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <Button
          icon="edit"
          text="Edit profile"
        />
      </Box>
    </Flex>
  )
}