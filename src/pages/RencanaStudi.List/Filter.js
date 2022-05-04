import { Button, ControlGroup, Dialog, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogMataKuliahBaru from "./Dialog.GenerateBatch";

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
            defaultValue={filter["name"] || ""}
            onChange={(e) => {
              setFilter(f => ({ ...f, name: e.target.value }), true);
            }}
          />
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