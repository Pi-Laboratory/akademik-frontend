import { Checkbox, NonIdealState, Spinner } from '@blueprintjs/core'
import { Box, Flex, ListGroup, useClient, useList } from 'components'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  const client = useClient();
  const { items, setItems, filter, setPaging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["classes"].find({
          query: {
            $limit: 25,
            "name": filter["name"] ? {
              $iLike: `%${filter["name"]}%`
            } : undefined,
            "generation": filter["generation"] || undefined,
            "study_program_id": filter["study_program_id"] || undefined,
            $include: [{
              model: "majors",
              $select: ["name"]
            }, {
              model: "study_programs",
              $select: ["name"]
            }, {
              model: "students",
              $select: ["id"]
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
  }, [client, setItems, setPaging, filter]);

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
              <Box sx={{ color: "gray.5" }}>
                Jumlah Mahasiswa
              </Box>
              <Box>
                {item["students"].length}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
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

export default List;
