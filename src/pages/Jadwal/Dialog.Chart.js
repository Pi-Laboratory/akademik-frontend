import { Dialog} from "@blueprintjs/core";
import * as Yup from "yup";
import Chart  from "./Chart";


const Schema = Yup.object().shape({
  "ipk-min": Yup.string().required(),
  "nip": Yup.string().required(),
})

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