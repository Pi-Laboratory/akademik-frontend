import { Checkbox, NonIdealState, Spinner, Tag } from '@blueprintjs/core'
import { Box, Flex, ListGroup, useClient, useList } from 'components'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Item } from './Item'

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
        const res = await client["registrations"].find({
          query: {
            status: filter["status"] === "null" ? undefined : filter["status"] || undefined,
            $skip: paging.skip,
            $select: ["id", "school_name", "nisn", "status"],
            $include: [{
              model: "students",
              $select: ["id", "name"]
            }, {
              model: "study_programs",
              as: "study_program_1",
              $select: ["id", "name"],
              $include: [{
                model: "majors",
                $select: ["id", "name"]
              }]
            }, {
              model: "study_programs",
              as: "study_program_2",
              $select: ["id", "name"],
              $include: [{
                model: "majors",
                $select: ["id", "name"]
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
        <Item key={item["id"]} data={item} />
      ))}
    </>
  )
}

export default List
