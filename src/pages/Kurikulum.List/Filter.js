import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, Select } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogKurikulumBaru from "./Dialog.Tambah";

const Filter = () => {
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