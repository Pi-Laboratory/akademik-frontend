import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex } from "components";

const Filter = () => {
  return (
    <Flex>
      <Box>
        <InputGroup large={true} leftIcon="search" placeholder="Filter by name" />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <ButtonGroup large={true}>
          <Button text="Id" />
          <Button text="Nama" />
          <Button active={true} text="NIP" />
          <Button text="NIDN" />
          <Button text="Gelar Depan" />
          <Button text="Gelar Belakang" />
          <Button text="Prodi" />
          <Button text="Status" />
        </ButtonGroup>
      </Box>
    </Flex>
  )
}

export default Filter;