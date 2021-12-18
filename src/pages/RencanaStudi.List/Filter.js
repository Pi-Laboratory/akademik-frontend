import { Button, ControlGroup, Dialog, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, Select, useList } from "components";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DialogMataKuliahBaru from "./Dialog.GenerateBatch";

const Filter = () => {
  const location = useLocation();
  const { selectedItem } = useList();
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
        <Divider vertical={true} sx={{ my: 1 }} />
        <Button
          disabled={selectedItem.length === 0}
          intent="primary"
          text="Generate Rencana Studi"
          onClick={() => setDialogOpen("add")}
        />
      </Flex>
      <Dialog
        enforceFocus={false}
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        title="Generate Rencana Studi"
      >
        <DialogMataKuliahBaru
          data={selectedItem}
          onClose={() => { setDialogOpen(null) }}
          onSubmitted={() => {
            history.go(0);
          }}
        />
      </Dialog>
    </Flex>
  )
}

export default Filter;