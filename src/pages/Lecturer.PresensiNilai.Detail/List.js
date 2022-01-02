import { Button, ButtonGroup, FormGroup, NonIdealState, NumericInput, Spinner } from '@blueprintjs/core';
import { Box, Flex, ListGroup, useClient, useList } from 'components';
import React, { useEffect } from 'react';

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, filter, paging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    setItems(null);
    setPaging(p => ({
      ...p,
      total: 0
    }));
    const fetch = async () => {
      try {
        const res = await client["students"].find({
          query: {
            $select: ["id", "name", "nim"],
            $include: [{
              model: "studies",
              $select: ["id"],
              // $where: {
              //   "study_program_id": filter["study_program_id"],
              // },
              $include: [{
                model: "study_results",
                $select: ["id"],
                $include: [{
                  model: "subject_lecturers",
                  $select: ["id"],
                }]
              }, {
                model: "study_plans",
                $select: ["id"],
                $include: [{
                  model: "subject_lecturers",
                  $select: ["id"],
                  // $where: {
                  //   "l"
                  // }
                }]
              }]
            }]
          }
        });
        console.log(res.data);
        setItems(res.data);
        setPaging({
          total: res.total,
          limit: res.limit,
          skip: res.skip
        });
      } catch (err) {
        console.error(err);
        setItems([]);
      }
    }
    fetch();
  }, [client, setItems, setPaging, paging.skip, filter]);

  return (
    <>
      {items === null &&
        <Box sx={{ p: 2 }}>
          <Spinner size={50} />
        </Box>
      }
      {items && items.length === 0 &&
        <Box sx={{ p: 3 }}>
          <NonIdealState
            title="Kosong"
            description="Belum ada data"
          />
        </Box>
      }
      {items && items.map((item) => (
        <ListGroup.Item key={item["id"]}>
          <Flex>
            <Box sx={{ flexShrink: 0, mr: 3, width: "25%" }}>
              <Box>
                {item["name"]}
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["nim"]}
              </Box>
            </Box>
            {[
              ["Kehadiran", Math.round(Math.random() * 100)],
              ["Tugas", Math.round(Math.random() * 100)],
              ["UTS", Math.round(Math.random() * 100)],
              ["UAS", Math.round(Math.random() * 100)],
            ].map((v) =>
              <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 5}%` }}>
                <Box sx={{ color: "gray.5" }}>
                  {v[0]}
                </Box>
                <Box sx={{
                  "> div": {
                    mb: 0
                  }
                }}>
                  <FormGroup inline={true}>
                    <NumericInput
                      min={0}
                      max={100}
                      defaultValue={v[1]}
                      size={3}
                      small={true}
                      onValueChange={() => {
                        dispatchSelectedItem({
                          type: "toggle",
                          data: {
                            name: item["id"],
                            value: true
                          }
                        });
                      }}
                    />
                  </FormGroup>
                </Box>
              </Box>)}
            <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 5}%` }}>
              <Box sx={{ color: "gray.5" }}>
                Predikat
              </Box>
              <Box sx={{
                "> div": {
                  mb: 0
                }
              }}>
                {Math.round(Math.random() * 4)}
              </Box>
            </Box>
            <Box sx={{ flexShrink: 0, width: "30px" }}>
              {selectedItem.indexOf(item["id"]) !== -1 &&
                <ButtonGroup minimal={true}>
                  {/* <Button
                    icon="undo"
                    onClick={() => {
                      dispatchSelectedItem({
                        type: "remove",
                        data: {
                          name: item["id"],
                        }
                      });
                    }}
                  /> */}
                  <Button
                    icon="tick"
                    onClick={() => {
                      dispatchSelectedItem({
                        type: "remove",
                        data: {
                          name: item["id"],
                        }
                      });
                    }}
                  />
                </ButtonGroup>}
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
