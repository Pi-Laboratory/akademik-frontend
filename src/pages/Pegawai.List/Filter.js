import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogTambahBaru from "./Dialog.Tambah";
import DialogHapus from "./Dialog.Hapus";
import { filterField } from ".";

const Filter = () => {
  const { selectedItem, filter, setFilter } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);
  const history = useHistory();
  return (
    <Flex>
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

      {filterField.map(f => !!filter[f]).indexOf(true) !== -1
        && <Box>
          <Button
            title="Clear Filter"
            minimal={true}
            intent="warning"
            icon="filter-remove"
            onClick={() => {
              const ff = {};
              filterField.forEach(f => ff[f] = undefined);
              setFilter(filter => ({
                ...filter,
                ...ff
              }));
            }}
          />
        </Box>}
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
          text="Tambah Baru"
          onClick={() => setDialogOpen("add")}
        />

      </Flex>
      <DialogHapus
        isOpen={dialogOpen === "delete"}
        data={selectedItem}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />

      <DialogTambahBaru
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