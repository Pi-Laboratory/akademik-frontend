import { Button, Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useList } from "components";
import { Pagination } from "components/Pagination";
import { filterField } from ".";
import Filter from "./Filter";
import List from "./List";

const Layout = () => {
  const { paging, setPaging, filter, setFilter, items, status, dispatchSelectedItem } = useList();
  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <Filter />
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
                label="Tipe Gedung"
                value={filter["type"]}
                options={[
                  { label: "Ruangan", value: "Ruangan" },
                  { label: "Gedung", value: "Gedung" },
                  { label: "Laboratorium", value: "Laboratorium" },
                ]}
                onChange={({ value }) => {
                  setFilter(filter => ({ ...filter, "type": value }))
                }}
              />
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
            </Box>
          </Flex>
        </ListGroup.Header>
        <List />
        <Pagination
          loading={items === null}
          total={paging.total}
          limit={paging.limit}
          skip={paging.skip}
          onClick={({ page, skip }) => {
            setPaging(paging => ({ ...paging, skip: skip }));
          }}
        />
      </ListGroup>
    </Box>
  );
}

export default Layout;