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
        const res = await client["classes"].find({
          query: {
            $select: ["id", "name"],
            $include: [{
              model: "majors",
              $select: ["name"]
            }, {
              model: "study_programs",
              $select: ["name"]
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
                <Link to={`/kelas/${item["id"]}`}>
                  {item["name"]}
                </Link>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                TL-D4-2020
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                1
              </Box>
              <Box sx={{ color: "gray.5" }}>
                Semester
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                23
              </Box>
              <Box sx={{ color: "gray.5" }}>
                Jumlah Mahasiswa
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
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

export default List;
