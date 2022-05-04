import { Button, ButtonGroup, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogTambah from "./Dialog.Tambah";

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
      <Box sx={{ flexGrow: 1 }} >
        <ControlGroup>
          <InputGroup
            leftIcon="search"
            placeholder="Filter by name"
            defaultValue={filter["username"] || ""}
            onChange={(e) => {
              setFilter(f => ({ ...f, username: e.target.value }), true);
            }}
          />
        </ControlGroup>
      </Box>
      <Box>
        <ButtonGroup>
          {[
            "Admin",
            "Dosen",
            "Mahasiswa",
            "Public",
          ].map((role) => (
            <Button
              key={role}
              text={role}
              active={filter["role"] === role}
              onClick={() => {
                setFilter(f => ({
                  ...f, role: f["role"] === role ? "" : role
                }), true);
              }}
            />
          ))}
        </ButtonGroup>
      </Box>
      <Box>
        <Button
          intent="primary"
          icon="plus"
          text="User Baru"
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
    </Flex>
  )
}

export default Filter;