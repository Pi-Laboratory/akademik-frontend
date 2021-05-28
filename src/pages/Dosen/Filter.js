import { Button, ButtonGroup, ControlGroup, Dialog, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, Select } from "components";
import { useState } from "react";
import DialogDosenBaru from "./Dialog.DosenBaru";

const Filter = () => {
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
        <Button minimal={true} intent="danger" text="Delete selected" />
        <Divider vertical={true} sx={{ my: 1 }} />
        <Button
          intent="primary"
          text="Dosen Baru"
          onClick={() => setDialogOpen("add")}
        />
      </Flex>
      <DialogDosenBaru
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
      />
    </Flex>
  )
}

export default Filter;