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
          <Button active={true} text="Nama" />
          <Button text="Tahun" />
          <Button text="Masa Studi" />
        </ButtonGroup>
      </Box>
    </Flex>
  )
}

export default Filter;