import { Alert, Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, Select } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogJurusanBaru from "./Dialog.JurusanBaru";

const Filter = ({ selectedItem }) => {
  const [dialogOpen, setDialogOpen] = useState(null);
  const history = useHistory();
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
          text="Tambah Jurusan"
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
          <span>Anda yakin ingin menghapus {selectedItem.length} data ini?</span>
          <Box as="span" sx={{ fontWeight: "bold" }}>Note:</Box> Data yang di hapus tidak dapat di kembalikan lagi.
        </p>
      </Alert>
      <DialogJurusanBaru
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
    </Flex>
  )
}

export default Filter;