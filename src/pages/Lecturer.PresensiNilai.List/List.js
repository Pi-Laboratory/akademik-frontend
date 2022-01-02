import { Checkbox, NonIdealState, Spinner } from '@blueprintjs/core';
import { Box, Flex, ListGroup, useClient, useList } from 'components';
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, filter, paging, dispatchSelectedItem } = useList();

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
            // $select: ["id", "day", "subject_id", "lecturer_id"],
            "lecturer_id": filter["lecturer_id"],
            $include: [{
              model: "subjects",
              $select: ["id", "name", "code", "semester"],
              // $where: {
              //   "study_program_id": filter["study_program_id"],
              // },
              $include: [{
                model: "study_programs",
                $select: ["id", "name"],
              }]
            }, {
              model: "lecturers",
              $select: ["id", "employee_id"],
              $include: [{
                model: "employees",
                $select: ["id", "front_degree", "name", "back_degree",]
              }]
            }, {
              model: "hours",
              $select: ["id", "day", "start", "end"]
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
            <Box sx={{ width: 40, flexShrink: 0 }}>
              <Checkbox onChange={(e) => {
                dispatchSelectedItem({
                  type: "toggle",
                  data: {
                    name: item["id"],
                    value: e.target.checked
                  }
                })
              }} />
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 3}%` }}>
              <Box>
                <Link to={`/penilaian/mata-kuliah/${item["subject"]["id"]}`}>
                  {item["subject"]["name"]}
                </Link>
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {item["subject"]["code"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, width: `${100 / 3}%` }}>
              {item["subject"]["study_program"]["name"]}
            </Box>
            <Box sx={{ flexGrow: 1, width: `${100 / 3}%` }}>
              <Box>33</Box>
              <Box sx={{ color: "gray.5" }}>
                Mahasiswa
              </Box>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List
