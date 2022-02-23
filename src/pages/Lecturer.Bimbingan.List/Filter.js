import { Button, ButtonGroup, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex } from "components";

const Filter = () => {
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
      <Box sx={{ flexGrow: 1 }}>
        <ControlGroup>
          <Button text="Filter" />
          <InputGroup fill={true} />
        </ControlGroup>
      </Box>
      <Box>
        <ButtonGroup>
          <Button text="Alumni" />
          <Button text="Drop out" />
        </ButtonGroup>
      </Box>
    </Flex>
  )
}

export default Filter;