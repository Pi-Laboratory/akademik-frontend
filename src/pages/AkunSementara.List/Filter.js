import { ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useList } from "components";

const Filter = () => {
  const { filter, setFilter } = useList();

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
          <InputGroup
            leftIcon="search"
            placeholder="Filter by name"
            value={filter["name"] || ""}
            onChange={(e) => {
              setFilter(f => ({ ...f, name: e.target.value }));
            }}
          />
        </ControlGroup>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Flex>
      </Flex>
    </Flex>
  )
}

export default Filter;