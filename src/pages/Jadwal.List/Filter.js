import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router";
import DialogTambah from "./Dialog.Tambah";
import DialogHapus from "./Dialog.Hapus";

const Filter = () => {
  const { filter, setFilter, selectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);
  const history = useHistory();
  return (
    <Flex>
      <Box>
        <ControlGroup>
          <InputGroup
            leftIcon="search"
            placeholder="Filter by subject name"
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
          text="Jadwal Baru"
          onClick={() => setDialogOpen("add")}
        />

      </Flex>
      <DialogTambah
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
      <DialogHapus
        isOpen={dialogOpen === "delete"}
        data={selectedItem}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
    </Flex>
  )
}

export default Filter;