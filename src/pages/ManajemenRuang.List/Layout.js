import { Checkbox, Classes } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useList } from "components";
import { Pagination } from "components/Pagination";
import Filter from "./Filter";
import List from "./List";

const Layout = () => {
  const { paging, setPaging, items, status, dispatchSelectedItem } = useList();
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
                label="Pengelola"
                options={[
                  { label: "Politeknik Negeri Manado", value: 0 },
                  { label: "Teknik Elektro", value: 0 },
                  { label: "Teknik Mesin", value: 1 },
                  { label: "Teknik Sipil", value: 2 },
                  { label: "PLN", value: 3 },
                  { label: "Teknik LIstrik", value: 3 },
                ]}
              />

              <Select
                minimal={true}
                label="Tipe Gedung"
                options={[
                  { label: "Lab", value: 0 },
                  { label: "Bengkel", value: 0 },
                  { label: "Gedung", value: 1 },
                ]}
              />
              <Select
                minimal={true}
                label="Status Kelayakan"
                options={[
                  { label: "Layak", value: 0 },
                  { label: "Tidak Layak", value: 0 },
                ]}
              />
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