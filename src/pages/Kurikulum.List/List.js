import { Checkbox, NonIdealState, Spinner } from '@blueprintjs/core'
import { Box, Flex, ListGroup, useClient, useList } from 'components'
import { useDebounce } from 'components/helper'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  const client = useClient();
  const { items, setItems, paging, setPaging, filter, selectedItem, dispatchSelectedItem } = useList();

  const _f = useDebounce(filter, 200);

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["curriculums"].find({
          query: {
            "name": _f["name"] ? {
              $iLike: `%${_f["name"]}%`
            } : undefined,
            "year": _f["year"] || undefined,
            "study_program_id": _f["study_program_id"] || undefined,
            $select: ["id", "name", "ideal_study_period", "maximum_study_period", "created_at"],
            $skip: paging.skip,
            $include: [{
              model: "study_programs",
              $select: ["id", "name"],
              $include: [{
                model: "majors",
                $select: ["id", "name"]
              }]
            }],
            $distinct: true
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
    };
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
                <Link to={`${item["id"]}`}>
                  {item["name"]}
                </Link>
              </Box>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Box>
                24
              </Box>
              <Box sx={{ color: "gray.5" }}>
                Mata Kuliah
              </Box>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Box>
                {item["study_program"]["name"]}
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["study_program"]["major"]["name"]}
              </Box>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
