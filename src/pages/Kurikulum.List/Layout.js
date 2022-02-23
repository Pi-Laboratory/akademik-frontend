import React, { useEffect, useState } from 'react'
import { Box, Flex, ListGroup, Select, Pagination, useClient, useList } from 'components'
import List from './List'
import { Button, Checkbox, Classes } from '@blueprintjs/core'
import Filter from './Filter'
import DialogHapusKurikulum from "./Dialog.Hapus";
import { useHistory } from 'react-router-dom'

export const Layout = () => {
  const client = useClient();
  const history = useHistory();

  const { selectedItem, paging, setPaging, filter, setFilter, items, status, dispatchSelectedItem } = useList();
  const [studyPrograms, setStudyPrograms] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["study-programs"].find({
          query: {
            $limit: 100,
            $select: ["id", "name"],
            $include: [{
              model: "majors",
              $select: ["id", "name"]
            }]
          }
        });
        setStudyPrograms(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, filter]);

  return (
    <Box>
      <Box sx={{ px: 3, pt: 3 }}>
        <Filter />
        <ListGroup
          sx={{
            [`.${Classes.CHECKBOX}`]: {
              m: 0,
            }
          }}
        >
          <ListGroup.Header>
            <Flex sx={{ alignItems: "center" }}>
              <Box sx={{ width: 40, flexShrink: 0 }}>
                <Checkbox
                  disabled={(items === null) || items.length === 0}
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
              <Box sx={{ flexGrow: 1, ml: -10 }}>
                {selectedItem.length > 0 &&
                  <Button
                    minimal={true}
                    intent="danger"
                    text={`Delete ${selectedItem.length} selected`}
                    onClick={() => setDialogOpen("delete")}
                  />
                }
                <DialogHapusKurikulum
                  data={selectedItem}
                  isOpen={dialogOpen === "delete"}
                  onClose={() => { setDialogOpen(null) }}
                  onSubmitted={() => {
                    history.go(0);
                  }}
                />
              </Box>
              <Box sx={{ flexShrink: 0 }}>
                <Select
                  minimal={true}
                  label="Tahun"
                  value={filter["year"]}
                  options={Array(25).fill(0).map((_, idx) => {
                    const year = String(new Date().getFullYear() - idx);
                    return ({
                      label: year,
                      value: year
                    })
                  })}
                  onChange={({ value }) => {
                    setFilter(filter => ({ ...filter, "year": value }))
                  }}
                />
                <Select
                  minimal={true}
                  label="Program Studi"
                  value={filter["study_program_id"]}
                  options={studyPrograms.map((item) => {
                    return {
                      label: item["name"],
                      value: item["id"],
                      info: item["major"]["name"]
                    }
                  })}
                  onChange={({ value }) => {
                    setFilter(filter => ({ ...filter, "study_program_id": value }))
                  }}
                />
                {[
                  !!filter["year"],
                  !!filter["study_program_id"]
                ].indexOf(true) !== -1
                  && <Button
                    minimal={true}
                    intent="warning"
                    icon="filter-remove"
                    onClick={() => {
                      setFilter(filter => ({
                        ...filter,
                        "year": null,
                        "study_program_id": null
                      }))
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
