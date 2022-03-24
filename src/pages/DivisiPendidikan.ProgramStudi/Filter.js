import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogHapusProdi from "./Dialog.Hapus";
import DialogTambahProdi from "./Dialog.Tambah";

const Filter = () => {
  const { selectedItem, filter, setFilter } = useList();
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
      <Box>
        <ControlGroup>
          <InputGroup
            leftIcon="search"
            placeholder="Filter by name"
            value={filter["name"] || ""}
            onChange={(e) => {
              setFilter(f => ({ ...f, name: e.target.value }));
            }}
          />
        </ControlGroup>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Flex>
        {selectedItem.length > 0 &&
          <Button
            minimal={true}
            intent="danger"
            text={`Delete ${selectedItem.length} selected`}
            onClick={() => setDialogOpen("delete")}
          />
        }
        <Divider vertical={true} sx={{ my: 2 }} />
        <Button
          intent="primary"
          text="Tambah Prodi"
          onClick={() => setDialogOpen("add")}
        />

      </Flex>
      <DialogTambahProdi
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
      <DialogHapusProdi
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