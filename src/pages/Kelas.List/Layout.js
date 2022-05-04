import { Button, Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import Filter from "./Filter";
import List from "./List";
import { Pagination } from "components/Pagination";
import { filterField } from ".";
import { FetchAndSelect } from "components/FetchAndSelect";

const Layout = () => {
  const client = useClient();
  const { paging, setPaging, filter, setFilter, items, status, selectedItem, dispatchSelectedItem } = useList();

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Filter selectedItem={selectedItem} />
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
              <FetchAndSelect
                service={client["study-programs"]}
                id="f-study_program_id"
                name="study_program_id"
                minimal={true}
                placeholder="Program Studi"
                value={filter["study_program_id"]}
                onChange={({ value }) => {
                  setFilter(filter => ({ ...filter, "study_program_id": value }), true)
                }}
                onPreFetch={(q, query) => {
                  return {
                    ...query,
                    "name": q ? {
                      $iLike: `%${q}%`
                    } : undefined,
                    $select: ["id", "name"],
                    $include: [{
                      model: "majors",
                      $select: ["id", "name"]
                    }]
                  }
                }}
                onFetched={(items) => {
                  return items.map((item) => {
                    return {
                      label: item["name"],
                      value: `${item["id"]}`,
                      info: item["major"]["name"]
                    }
                  })
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
      </ListGroup>
      <Pagination
        loading={items === null}
        total={paging.total}
        limit={paging.limit}
        skip={paging.skip}
        onClick={({ page, skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Box >
  )
}

export default Layout;