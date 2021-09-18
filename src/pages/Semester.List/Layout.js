import { Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useList } from "components";
import Filter from "./Filter";
import List from "./List";
import { Pagination } from "components/Pagination";

const Layout = () => {
  const { paging, setPaging, items, status, dispatchSelectedItem } = useList();

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
                options={[
                  { label: "2020", value: 2020 },
                  { label: "2019", value: 2019 },
                  { label: "2018", value: 2018 },
                  { label: "2017", value: 2017 },
                  { label: "2016", value: 2016 },
                  { label: "2015", value: 2015 },
                ]}
              />
            </Box>

            <Box sx={{ flexShrink: 0 }}>
              <Select
                minimal={true}
                label="Periode"
                options={[
                  { label: "Gasal", value: 0 },
                  { label: "Ganjil", value: 1 },
                ]}
              />
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
        onClick={({ skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Box >
  )
}

export default Layout;