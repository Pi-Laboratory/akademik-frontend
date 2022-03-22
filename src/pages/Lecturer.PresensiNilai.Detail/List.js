import { NonIdealState, Spinner } from '@blueprintjs/core';
import { Box, ListGroup, useClient, useList } from 'components';
import React, { useEffect } from 'react';
import Student from './Student';

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
        const res = await client["study-results"].find({
          query: {
            "subject_lecturer_id": filter["subject_lecturer_id"],
            $select: [
              "id",
              "final_test_score",
              "mid_test_score",
              "attendance_score",
              "task_score"
            ],
            $include: [{
              model: "studies",
              $select: ["id"],
              $include: [{
                model: "students",
                $select: ["name", "nim"],
              }]
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
          <Student data={item} />
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
