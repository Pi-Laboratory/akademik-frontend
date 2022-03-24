import { Box, Flex, ListGroup, Select, useClient, useList, Pagination } from 'components'
import React, { useEffect, useCallback, useState } from 'react'
import List from './List'
import { Button, Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'
import { useHistory } from 'react-router-dom'
import { DialogAssign } from './Dialog.Assign'
import { filterField } from '.'

export const Layout = () => {
  const client = useClient();
  const { paging, setPaging, filter, setFilter, items, status, dispatchSelectedItem } = useList();

  const [studyPrograms, setStudyPrograms] = useState([]);
  const { selectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);
  const history = useHistory();

  const fetchStudyPrograms = useCallback(async (query) => {
    try {
      const res = await client["study-programs"].find({
        query: {
          "name": query ? {
            $iLike: `%${query}%`
          } : undefined,
          $limit: 100,
          $select: ["id", "name"],
          $include: [{
            model: "majors",
            $select: ["id", "name"]
          }]
        }
      });
      await setStudyPrograms(res.data.map(({ id, name, major }) => ({
        label: name,
        value: id,
        info: major["name"]
      })));
    } catch (err) {
      console.error(err);
    }
  }, [client]);

  useEffect(() => {
    fetchStudyPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box sx={{ px: 3, pt: 4 }}>
        <Filter />
        <ListGroup
          sx={{
            [`.${Classes.CHECKBOX}`]: {
              m: 0
            }
          }}
        >
          <ListGroup.Header>
            <Flex sx={{ alignItems: "center" }}>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox
                  checked={status.checked}
                  indeterminate={status.indeterminate}
                  onChange={(e) => {
                    const x = items.filter(item => !item["preceptor"]).map(item => item["id"]);
                    const y = e.target.checked;
                    if (!y || status.indeterminate) {
                      dispatchSelectedItem({
                        type: "all",
                        checked: false
                      });
                    } else {
                      dispatchSelectedItem({
                        type: "exclude",
                        data: x,
                        checked: true
                      });
                    }
                  }}
                />
              </Box>
              <Flex sx={{ flexGrow: 1, alignItems: "center" }}>
                {selectedItem.length > 0 &&
                  <Box sx={{ mr: 2 }}>
                    <Box>{selectedItem.length} of {paging.total} selected</Box>
                  </Box>
                }
                {selectedItem.length > 0 &&
                  <Box>
                    <Button
                      outlined={true}
                      intent="primary"
                      text={`Assign pembimbing`}
                      onClick={() => setDialogOpen("assign")}
                    />
                    <DialogAssign
                      isOpen={dialogOpen === "assign"}
                      data={selectedItem}
                      onClose={() => { setDialogOpen(null) }}
                      onSubmitted={() => {
                        history.go(0);
                      }}
                    />
                  </Box>}
              </Flex>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ flexShrink: 0 }}>
                <Select
                  minimal={true}
                  label="Angkatan"
                  value={filter["generation"]}
                  options={Array(25).fill(0).map((_, idx) => {
                    const year = String(new Date().getFullYear() - idx);
                    return ({
                      label: year,
                      value: year
                    })
                  })}
                  onChange={({ value }) => {
                    setFilter(filter => ({ ...filter, "generation": value }))
                  }}
                />
                <Select
                  minimal={true}
                  label="Program Studi"
                  value={filter["study_program_id"]}
                  options={studyPrograms}
                  onQueryChange={(query) => {
                    fetchStudyPrograms(query);
                  }}
                  onOpening={async () => await fetchStudyPrograms()}
                  onChange={({ value }) => {
                    setFilter(filter => ({ ...filter, "study_program_id": value }))
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
    </Box>
  )
}
