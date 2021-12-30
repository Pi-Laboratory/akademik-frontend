import { Button, ButtonGroup, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogHapus from "./Dialog.Hapus";
import DialogTambah from "./Dialog.Tambah";

const Filter = () => {
  const { selectedItem } = useList();
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
      <Box sx={{ flexGrow: 1 }} >
        <ControlGroup>
          <Button text="Filter" />
          <InputGroup fill={true} />
        </ControlGroup>
      </Box>
      {selectedItem.length > 0 &&
        <Box>
          <Button
            minimal={true}
            intent="danger"
            text={`Delete ${selectedItem.length} selected`}
            onClick={() => setDialogOpen("delete")}
          />
        </Box>
      }
      <Box>
        <ButtonGroup>
          <Button
            text="Admin"
          />
          <Button
            text="Dosen"
          />
          <Button
            text="Mahasiswa"
          />
        </ButtonGroup>
      </Box>
      <Box>
        <Button
          intent="primary"
          icon="plus"
          text="User Baru"
          onClick={() => setDialogOpen("add")}
        />
      </Box>
      <DialogTambah
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
      <DialogHapus
        data={selectedItem}
        isOpen={dialogOpen === "delete"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
    </Flex>
  )
}

export default Filter;