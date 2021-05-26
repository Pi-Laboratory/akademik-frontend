import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex } from "components";

const Filter = () => {
  return (
    <Flex>
      <Box>
        <InputGroup large={true} leftIcon="search" placeholder="Filter by user" />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <ButtonGroup large={true}>
          <Button text="No" />
          <Button active={true} text="Nama Prodi" />
          <Button text="Jenjang Studi" />
        </ButtonGroup>
      </Box>
    </Flex>
  )
}

export default Filter;