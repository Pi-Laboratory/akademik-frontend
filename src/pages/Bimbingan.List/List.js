import { NonIdealState, Spinner } from '@blueprintjs/core'
import { Box, ListGroup, useClient, useList } from 'components'
import { useDebounce } from 'components/helper'
import React, { useEffect } from 'react'
import Item from './Item'

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, filter, paging } = useList();

  const _f = useDebounce(filter, 200);

  useEffect(() => {
    setItems(null);
    const fetch = async () => {
      try {
        const res = await client["students"].find({
          query: {
            $limit: 25,
            "name": _f["name"] ? {
              $iLike: `%${_f["name"]}%`
            } : undefined,
            "lecturer_id": _f["lecturer_id"] || undefined,
            "generation": _f["generation"] || undefined,
            "study_program_id": _f["study_program_id"] || undefined,
            "nim": {
              $ne: null
            },
            $sort: {
              generation: -1,
              name: 1
            },
            $skip: paging.skip,
            $select: ["id", "name", "nim", "student_status", "generation"],
            $include: [{
              model: "preceptors",
              $select: ["id", "lecturer_id"],
              $include: [{
                model: "lecturers",
                $select: ["id", "employee_id"],
                $include: [{
                  model: "employees",
                  $select: ["id", "front_degree", "name", "back_degree"]
                }]
              }]
            }, {
              model: "study_programs",
              $select: ["id", "name"]
            }]
          }
        });
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
  }, [client, setItems, setPaging, paging.skip, _f]);

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
        <ListGroup.Item
          key={item["id"]}
          sx={{
            [`.action`]: {
              width: "30px",
              opacity: "0",
              pointerEvents: "none"
            },
            [`&:hover .action`]: {
              opacity: "1",
              pointerEvents: "unset"
            }
          }}>
          <Item data={item} />
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
