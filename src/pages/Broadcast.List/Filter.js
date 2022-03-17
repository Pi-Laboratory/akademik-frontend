import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, Select, useList } from "components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { DialogPublish } from "./Dialog.Publish";

const Filter = () => {
  const { selectedItem } = useList();
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
        <Box>
          {selectedItem.length > 0 &&
            <Button
              text={`Create Message`}
              intent="primary"
              onClick={() => {
                setDialogOpen("publish");
              }}
            />}
        </Box>
      </Flex>
      <DialogPublish
        data={selectedItem}
        isOpen={dialogOpen === "publish"}
        onClose={() => { setDialogOpen(null) }}
        onSubmitted={() => {
          history.go(0);
        }}
      />
    </Flex>
  )
}

export default Filter;