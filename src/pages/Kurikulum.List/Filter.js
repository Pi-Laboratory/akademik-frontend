import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogKurikulumBaru from "./Dialog.Tambah";

const Filter = () => {
  const { filter, setFilter } = useList();
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
        <Button
          intent="primary"
          text="Kurikulum Baru"
          onClick={() => setDialogOpen("add")}
        />
      </Flex>
      <DialogKurikulumBaru
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