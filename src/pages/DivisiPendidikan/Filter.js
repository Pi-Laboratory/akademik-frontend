import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, Select } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogHapusProdi from "./Dialog.HapusProdi";
import DialogTambahProdi from "./Dialog.TambahProdi";

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