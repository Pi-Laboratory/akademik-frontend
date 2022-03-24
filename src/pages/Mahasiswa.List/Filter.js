import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useList } from "components";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DialogTambah from "./Dialog.Tambah";
import DialogHapus from "./Dialog.Hapus";

const Filter = () => {
  const location = useLocation();
  const { selectedItem, filter, setFilter } = useList();
  const [dialogOpen, setDialogOpen] = useState(new URLSearchParams(location.search).get("d") || null);
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
      <Box>
        {selectedItem.length > 0 &&
          <Button
            minimal={true}
            intent="danger"
            text={`Delete ${selectedItem.length} selected`}
            onClick={() => setDialogOpen("delete")}
          />
        }
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