import { Card } from "@blueprintjs/core";
import { DatePicker, Classes as DateClasses } from "@blueprintjs/datetime";
import { Box } from "components";

const Side = () => {
  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          [`.${DateClasses.DATEPICKER}`]: {
            bg: "transparent"
          }
        }}
      >
        <DatePicker
          highlightCurrentDay={true}
        />
      </Box>
    </Box>
  )
}

export default Side;