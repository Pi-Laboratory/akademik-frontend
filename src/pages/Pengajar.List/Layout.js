import { Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useList } from "components";
import { Pagination } from "components/Pagination";
import Filter from "./Filter";
import List from "./List";

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
                label="Jabatan"
                options={[
                  { label: "Pengajar", value: 0 },
                  { label: "Staff", value: 0 },
                ]}
              />
              <Select
                minimal={true}
                label="Program Studi"
                options={[
                  { label: "Teologi", value: 0 },
                  { label: "Teknik Elektro", value: 0 },
                  { label: "Teknik Arsitektur", value: 1 },
                  { label: "Akuntansi", value: 2 },
                  { label: "Teknik Sipil", value: 3 },
                  { label: "Bahasa Inggris", value: 3 },
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
        onClick={({ page, skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Box >
  );
}

export default Layout;