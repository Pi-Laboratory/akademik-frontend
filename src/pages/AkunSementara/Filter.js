import { Alert, Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, Select } from "components";
import { useState } from "react";
import DialogGenerateAkun from "./Dialog.GenerateAkun";

const Filter = ({ selectedItem }) => {
  const [dialogOpen, setDialogOpen] = useState(null);
  return (
    <Flex>
      <Box>
        <ControlGroup>
          <Select
            label="Filter"
            options={[
              { label: "Nama", value: 0 },
              { label: "Prodi Pilihan", value: 1 },
              // { label: "NIDN", value: 2 },
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
        <Button
          intent="primary"
          text="Generate Akun"
          onClick={() => setDialogOpen("generate")}
        />
        <Divider vertical={true} sx={{ my: 1 }} />
        <Button
          intent="primary"
          text="Mahasiswa Baru"
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
       <DialogGenerateAkun
        isOpen={dialogOpen === "generate"}
        onClose={() => { setDialogOpen(null) }}
      />
    </Flex>
  )
}

export default Filter;