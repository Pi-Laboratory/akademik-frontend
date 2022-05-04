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
      <Box sx={{ flexGrow: 1 }}>
        <ControlGroup>
          <InputGroup
            leftIcon="search"
            placeholder="Filter by name"
            defaultValue={filter["name"] || ""}
            onChange={(e) => {
              setFilter(f => ({ ...f, name: e.target.value }), true);
            }}
          />
        </ControlGroup>
      </Box>
    </Flex>
  )
}

export default Filter;