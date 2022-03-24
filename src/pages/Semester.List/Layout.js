import { Button, Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useList } from "components";
import Filter from "./Filter";
import List from "./List";
import { Pagination } from "components/Pagination";
import moment from "moment";
import { filterField } from ".";

const Layout = () => {
  const { paging, setPaging, items, filter, setFilter, status, dispatchSelectedItem } = useList();

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Filter />
      </Box>
      <ListGroup sx={{
        width: "100%",
        [`.${Classes.CHECKBOX}`]: {
          m: 0
        }
      }}>
        <ListGroup.Header>
          <Flex sx={{ alignItems: "center" }}>
            <Box sx={{ width: 40, flexShrink: 0, }}>
              <Checkbox
                checked={status.checked}
                indeterminate={status.indeterminate}
                onChange={(e) => {
                  dispatchSelectedItem({
                    type: "all",
                    data: e.target.checked
                  })
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexShrink: 0 }}>

              <Select
                minimal={true}
                label="Tahun"
                value={filter["year"]}
                options={new Array(50).fill(0).map((_, i) => {
                  let value = `${moment().subtract(i, "year").get("year")}`;
                  return {
                    label: value,
                    value
                  }
                })}
                onChange={({ value }) => setFilter(filter => ({
                  ...filter,
                  "year": value
                }))}
              />
            </Box>

            <Box sx={{ flexShrink: 0 }}>
              <Select
                minimal={true}
                label="Periode"
                value={filter["type"]}
                options={[
                  { label: "Gasal", value: "Gasal" },
                  { label: "Genap", value: "Genap" },
                ]}
                onChange={({ value }) => setFilter(filter => ({
                  ...filter,
                  "type": value
                }))}
              />
            </Box>
            {filterField.map(f => !!filter[f]).indexOf(true) !== -1
              && <Button
                title="Clear Filter"
                minimal={true}
                intent="warning"
                icon="filter-remove"
                onClick={() => {
                  const ff = {};
                  filterField.forEach(f => ff[f] = undefined);
                  setFilter(filter => ({
                    ...filter,
                    ...ff
                  }));
                }}
              />}
          </Flex>
        </ListGroup.Header>
        <List />
      </ListGroup>
      <Pagination
        loading={items === null}
        total={paging.total}
        limit={paging.limit}
        skip={paging.skip}
        onClick={({ skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Box >
  )
}

export default Layout;