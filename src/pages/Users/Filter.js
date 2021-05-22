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
          <Button text="Id" />
          <Button active={true} text="Name" />
          <Button text="Role" />
        </ButtonGroup>
      </Box>
    </Flex>
  )
}

export default Filter;