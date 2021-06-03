import { Alert, Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, Select } from "components";
import { useState } from "react";
import DialogKelasBaru from "./Dialog.KelasBaru";

const Filter = ({ selectedItem }) => {
  const [dialogOpen, setDialogOpen] = useState(null);
  return (
    <Flex>
      <Box>
        <ControlGroup>
          <Select
            label="Filter"
            options={[
              { label: "ID", value: 0 },
              { label: "Nama", value: 1 },
              { label: "NIDN", value: 2 },
            ]}
          />
          <InputGroup leftIcon="search" placeholder="Filter by name" />
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
        <Divider vertical={true} sx={{ my: 1 }} />
        <Button
          intent="primary"
          text="Mata Kuliah Baru"
          onClick={() => setDialogOpen("add")}
        />
      </Flex>
      <Alert
        isOpen={dialogOpen === "delete"}
        icon="trash"
        intent="danger"
        minimal={true}
        cancelButtonText="Tidak"
        confirmButtonText="Hapus"
        onClose={() => setDialogOpen(null)}
      >
        <p>
          <span>Anda yakin ingin menghapus {selectedItem.length} data dosen ini?</span>
          <Box as="span" sx={{ fontWeight: "bold" }}>Note:</Box> Data yang di hapus tidak dapat di kembalikan lagi.
        </p>
      </Alert>
      <DialogKelasBaru
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
      />
    </Flex>
  )
}

export default Filter;