import { Dialog} from "@blueprintjs/core";
import Chart  from "./Chart";

const DialogChart = ({ isOpen, onClose = () => { } }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Chart"
      style={{"width" : "1000px"}}
    >
      <Chart></Chart>
    </Dialog>
  )
}

export default DialogChart;