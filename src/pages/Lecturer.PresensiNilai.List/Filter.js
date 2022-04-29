import { ControlGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useList } from "components";

const Filter = () => {
  const { filter, setFilter } = useList();
  return (
    <Flex>
      <Box>
        <ControlGroup>
          <InputGroup
            leftIcon="search"
            placeholder="Filter by subject name"
            value={filter["name"] || ""}
            onChange={(e) => {
              setFilter(f => ({ ...f, name: e.target.value }));
            }}
          />
        </ControlGroup>
      </Box>
    </Flex>
  )
}

export default Filter;