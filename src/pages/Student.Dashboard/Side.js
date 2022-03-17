import { Card } from "@blueprintjs/core";
import { DatePicker, Classes as DateClasses } from "@blueprintjs/datetime";
import { Box } from "components";

const Side = () => {
  return (
    <Box>
      <Box
        sx={{
          [`.${DateClasses.DATEPICKER}`]: {
            bg: "transparent"
          }
        }}
      >
        <DatePicker
          highlightCurrentDay={true}
        />
      </Box>
      <Card>
        Coba
  </Card>
    </Box>
  )
}

export default Side;