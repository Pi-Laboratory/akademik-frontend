import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { filterField } from ".";
import DialogHapusJurusan from "./Dialog.Hapus";
import DialogJurusanBaru from "./Dialog.Tambah";

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
      <Flex>
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
        {filterField.map(f => !!filter[f]).indexOf(true) !== -1
          && <Button
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
          />}
      </Flex>
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
      <DialogJurusanBaru
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
      <DialogHapusJurusan
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