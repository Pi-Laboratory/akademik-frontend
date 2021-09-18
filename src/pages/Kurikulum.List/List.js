import { Checkbox, NonIdealState, Spinner } from '@blueprintjs/core'
import { Box, Flex, ListGroup, useClient, useList } from 'components'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["curriculums"].find({
          query: {
            $select: ["id", "name", "ideal_study_period", "maximum_study_period", "created_at"]
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
  }, [client, setItems, setPaging]);

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
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                2
              </Box>
              <Box sx={{ color: "gray.5" }}>
                min
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                3
              </Box>
              <Box sx={{ color: "gray.5" }}>
                Min.Percobaan
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                3
              </Box>
              <Box sx={{ color: "gray.5" }}>
                Maks Nilai D
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                24
              </Box>
              <Box sx={{ color: "gray.5" }}>
                Mata Kuliah
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              Teknik Elektro
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
