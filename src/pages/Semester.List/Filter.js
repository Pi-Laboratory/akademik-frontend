import { Button } from "@blueprintjs/core";
import { Box, Divider, Flex, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DialogHapusSemester from "./Dialog.Hapus";
import DialogSemesterBaru from "./Dialog.Tambah";

const Filter = () => {
  const { selectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);
  const history = useHistory();
  return (
    <Flex>
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
          text="Generate Semester"
          onClick={() => setDialogOpen("add")}
        />
      </Flex>
      <DialogSemesterBaru
        isOpen={dialogOpen === "add"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
      <DialogHapusSemester
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