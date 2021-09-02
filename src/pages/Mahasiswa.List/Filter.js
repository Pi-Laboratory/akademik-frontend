import { Button, ButtonGroup, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogTambah from "./Dialog.Tambah";

const Filter = () => {
  const [dialogOpen, setDialogOpen] = useState(null);
  const history = useHistory();
  return (
    <Flex
      sx={{
        mb: 3,
        mr: -3,
        "> div": {
          mr: 3
        }
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <ControlGroup>
          <Button text="Filter" />
          <InputGroup fill={true} />
        </ControlGroup>
      </Box>
      <Box>
        <ButtonGroup>
          <Button text="Alumni" />
          <Button text="Drop out" />
        </ButtonGroup>
      </Box>
      <Box>
        <Button
          intent="primary"
          text="Mahasiswa Baru"
          onClick={() => setDialogOpen("add")}
        />
      </Box>
      <DialogTambah
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          // history.go(0);
        }}
      />
    </Flex>
  )
}

export default Filter;