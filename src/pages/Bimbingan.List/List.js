import { Checkbox, NonIdealState, Spinner } from '@blueprintjs/core'
import { Box, Flex, ListGroup, useClient, useList } from 'components'
import { useDebounce } from 'components/helper'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, filter, paging, selectedItem, dispatchSelectedItem } = useList();

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
        <ListGroup.Item key={item["id"]}>
          <Flex>
            <Box sx={{ width: 40, flexShrink: 0 }}>
              <Checkbox
                disabled={!!item["preceptor"]}
                checked={selectedItem.indexOf(item["id"]) !== -1}
                onChange={(e) => {
                  dispatchSelectedItem({
                    type: "toggle",
                    data: {
                      name: item["id"],
                      value: e.target.checked
                    }
                  })
                }} />
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                <Link to={`mahasiswa/${item["id"]}/`}>
                  {item["name"]}
                </Link>
              </Box>
              <Box>
                {item["nim"]}
              </Box>
            </Box>
            <Box sx={{ width: "25%", flexShrink: 0 }}>
              {item["preceptor"] &&
                <>
                  <Box sx={{ color: "gray.5" }}>
                    Dibimbing oleh
                  </Box>
                  <Box>
                    <Link to={`pengajar/${item["id"]}/`}>
                      {item["preceptor"]["lecturer"]["employee"]["name"]}
                    </Link>
                  </Box>
                </>}
              {item["preceptor"] === null &&
                <Box sx={{ color: "gray.5" }}>
                  Belum ada pembimbing
                </Box>}
            </Box>
            <Box sx={{ width: "10%", flexShrink: 0 }}>
              {item["generation"]}
            </Box>
            <Box sx={{ width: "20%", flexShrink: 0 }}>
              <Box sx={{ color: "gray.5" }}>
                Program Studi
              </Box>
              <Box>
                {item["study_program"]["name"]}
              </Box>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
