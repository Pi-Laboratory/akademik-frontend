import { Button, Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, useClient, useList } from "components";
import Filter from "./Filter";
import { Pagination } from "components/Pagination";
import List from "./List";
import { filterField } from ".";
import { FetchAndSelect } from "components/FetchAndSelect";

const Layout = () => {
  const client = useClient();
  const { paging, setPaging, items, status, filter, setFilter, dispatchSelectedItem } = useList();

  return (
    <Box>
      <Box sx={{ px: 3, pt: 3 }}>
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
              <FetchAndSelect
                service={client["majors"]}
                id="f-major_id"
                name="major_id"
                minimal={true}
                placeholder="Jurusan"
                value={filter["major_id"]}
                onChange={({ value }) => {
                  setFilter(filter => ({ ...filter, "major_id": value }), true)
                }}
                onPreFetch={(q, query) => {
                  return {
                    ...query,
                    "name": q ? {
                      $iLike: `%${q}%`
                    } : undefined,
                    $select: ["id", "name"],
                  }
                }}
                onFetched={(items) => {
                  return items.map((item) => {
                    return {
                      label: item["name"],
                      value: `${item["id"]}`,
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
      </Box>
    </Box >
  )
}

export default Layout;