import { DatePicker, Classes as DateClasses } from "@blueprintjs/datetime";
import { Box } from "components";

const Side = () => {
  return (
    <Box sx={{ mb: 5 }}>
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
    </Box>
  )
}

export default Side;