import { Button, ButtonGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { useState } from "react"

const Filter = () => {
  const [state, setstate] = useState(false)
  return (
    <Flex>
      <Box>
        <InputGroup large={true} leftIcon="search" placeholder="Filter by user" />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <ButtonGroup large={true}>
          <Button active={state === 1 ? true : false} text="No" onClick={() => setstate(1)} />
          <Button active={state === 2 ? true : false} text="Jam" onClick={() => setstate(2)} />
        </ButtonGroup>
      </Box>
    </Flex>
  )
}

export default Filter;