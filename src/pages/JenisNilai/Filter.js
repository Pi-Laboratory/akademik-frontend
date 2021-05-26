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
          <Button active={state === 2 ? true : false} text="Kode Nilai" onClick={() => setstate(2)} />
          <Button active={state === 3 ? true : false} text="Bobot" onClick={() => setstate(3)} />
          <Button active={state === 4 ? true : false} text="Kelompok Nilai" onClick={() => setstate(4)} />
          <Button active={state === 5 ? true : false} text="Bobot Kelompok" onClick={() => setstate(5)} />
          <Button active={state === 6 ? true : false} text="Rentang Nilai" onClick={() => setstate(6)} />
          <Button active={state === 7 ? true : false} text="Label Asing" onClick={() => setstate(7)} />
        </ButtonGroup>
      </Box>
    </Flex>
  )
}

export default Filter;