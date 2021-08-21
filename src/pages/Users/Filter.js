import { Button, ButtonGroup, ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Divider, Flex } from "components";

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
      <Box sx={{ flexGrow: 1 }} >
        <ControlGroup>
          <Button text="Filter" />
          <InputGroup fill={true} />
        </ControlGroup>
      </Box>
      <Box>
        <ButtonGroup>
          <Button
            text="Admin"
          />
          <Button
            text="Dosen"
          />
          <Button
            text="Mahasiswa"
          />
        </ButtonGroup>
      </Box>
      <Box>
        <Button
          intent="primary"
          icon="plus"
          text="User Baru"
        />
      </Box>
    </Flex>
  )
}

export default Filter;