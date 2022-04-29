import { NonIdealState, Spinner } from '@blueprintjs/core';
import { Box, Flex, ListGroup, useClient, useList } from 'components';
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';

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
        const res = await client["subject-lecturers"].find({
          query: {
            $select: ["id", "subject_id", "lecturer_id"],
            "lecturer_id": filter["lecturer_id"],
            $include: [{
              model: "subjects",
              $select: ["id", "name", "code", "semester", "study_program_id"],
              $where: (filter["name"] || filter["study_program_id"]) ? {
                "name": filter["name"] ? {
                  $iLike: `%${filter["name"]}%`
                } : undefined,
                "study_program_id": filter["study_program_id"] ? filter["study_program_id"] : undefined,
              } : undefined,
              $include: [{
                model: "study_programs",
                $select: ["id", "name"],
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
          <Flex>
            <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 3}%` }}>
              <Box>
                <Link to={`/penilaian/jadwal/${item["id"]}`}>
                  {item["subject"]["name"]}
                </Link>
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["subject"]["code"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, width: `${100 / 3}%` }}>
              <Box sx={{ color: "gray.5" }}>
                Program Studi
              </Box>
              <Box>
                {item["subject"]["study_program"]["name"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, width: `${100 / 3}%` }}>
              <Box sx={{ color: "gray.5" }}>
                Semester
              </Box>
              <Box>
                {item["subject"]["semester"]}
              </Box>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
