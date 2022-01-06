import { Button, Checkbox } from "@blueprintjs/core";
import { Box, CONSTANTS, Flex, useList } from "components";
import { Link, useHistory } from "react-router-dom";
import { Fragment, useState } from "react";
import moment from "moment";
import DialogEdit from "./Dialog.Edit";

const Item = ({ data: item }) => {
  const { selectedItem, dispatchSelectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState();
  const history = useHistory();
  return (
    <Flex>
      <Box sx={{ width: 40, flexShrink: 0 }}>
        <Checkbox
          checked={selectedItem.indexOf(item["id"]) !== -1}
          onChange={(e) => {
            dispatchSelectedItem({
              type: "toggle",
              data: {
                name: item["id"],
                value: e.target.checked
              }
            })
          }}
        />
      </Box>
      <Box sx={{ flexShrink: 0, mr: 3, width: `15%` }}>
        {item["hours"].map((hour, idx) => {
          return (
            <Fragment key={idx}>
              <Box>
                {CONSTANTS["DAYS"][hour["day"]]}
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {moment(hour["start"], "HH:mm:ss").format("HH:mm")} - {moment(hour["end"], "HH:mm:ss").format("HH:mm")}
              </Box>
            </Fragment>
          )
        })}
      </Box>
      <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 3}%` }}>
        <Box>
          <Link to={`/staff-dan-pengajar/${item["lecturer"]["employee"]["nip"]}`}>
            {item["lecturer"]["employee"]["name"]}
          </Link>
        </Box>
        <Box sx={{ color: "gray.5" }}>
          {item["lecturer"]["nidn"]}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 3}%` }}>
        <Box>
          <Link to={`/kurikulum/mata-kuliah/${item["subject"]["id"]}`}>
            {item["subject"]["name"]}
          </Link>
        </Box>
        <Box sx={{ color: "gray.5" }}>
          {item["subject"]["code"]}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, width: `${100 / 3}%` }}>
        {item["subject"]["study_program"]["name"]}
      </Box>
      <Box className="action">
        <Button
          minimal={true}
          icon="edit"
          onClick={() => { setDialogOpen("edit"); }}
        />
      </Box>
      <DialogEdit
        data={item}
        isOpen={dialogOpen === "edit"}
        onClose={() => { setDialogOpen(null); }}
        onSubmitted={() => { history.go(0) }}
      />
    </Flex>
  )
}

export default Item;