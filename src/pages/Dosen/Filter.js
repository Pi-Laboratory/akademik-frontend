import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex } from "components";

const Filter = () => {
  return (
    <Flex>
      <Box>
        <InputGroup leftIcon="search" placeholder="Filter by name" />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Flex>
        <ButtonGroup>
          <Button text="Id" />
          <Button text="Nama" />
          <Button active={true} text="NIP" />
          <Button text="NIDN" />
        </ButtonGroup>
        <Divider vertical={true} sx={{ my: 1 }} />
        <Button intent="primary" text="Dosen Baru" />
      </Flex>
    </Flex>
  )
}

export default Filter;