import { NonIdealState, Spinner } from '@blueprintjs/core'
import { Box, Flex, ListGroup, useClient, useList } from 'components'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, filter, paging } = useList();

  useEffect(() => {
    setItems(null);
    setPaging(p => ({
      ...p,
      total: 0
    }));
    const fetch = async () => {
      try {
        const { account } = client;
        const res = await client["studies"].find({
          query: {
            "student_id": account["student_id"],
            $skip: paging.skip,
            $select: ["id", "semester"],
            $include: [{
              model: "study_plans",
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
            <Box sx={{ mr: 3, width: "50%" }}>
              <Link to={`${item["id"]}`}>
                <Box>
                  Semester {item["semester"]}
                </Box>
              </Link>
            </Box>
            <Box sx={{ mr: 3, width: "50%" }}>
              <Box>
                {item["study_plans"].length}
              </Box>
              <Box sx={{ color: "gray.5" }}>
                Mata Kuliah
              </Box>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
