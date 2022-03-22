import { NonIdealState, Spinner } from '@blueprintjs/core'
import { Box, useClient, useList } from 'components'
import React, { useEffect } from 'react'
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
        const query = {
          $limit: 25,
          $skip: paging.skip,
          $sort: {
            id: 1
          },
          $include: [{
            model: "students",
            $select: ["id", "name"],
          }, {
            model: "lecturers",
            $select: ["id"],
            $include: [{
              model: "employees",
              $select: ["id", "name"]
            }],
          }, {
            model: "registrations",
            $select: ["id"],
            $include: [{
              model: "students",
              $select: ["id", "name"]
            }],
          }]
        };
        if (filter["role"] === "lecturer") {
          query["lecturer_id"] = { $ne: null }
        } else if (filter["role"] === "student") {
          query["student_id"] = { $ne: null };
        } else if (filter["role"] === "public") {
          query["registration_id"] = { $ne: null };
        } else if (filter["role"] === "admin") {
          query["lecturer_id"] = null;
          query["student_id"] = null;
          query["registration_id"] = null;
        }

        const res = await client["users"].find({
          query
        });
        setItems(res.data.map((item) => {
          const res = {
            id: item["id"],
            username: item["username"],
            role: "Admin",
            url: "Admin",
            name: "",
          }
          if (item["lecturer_id"] !== null) {
            res.role = "Dosen";
            res.url = `/pengajar/${item["lecturer_id"]}`;
            res.name = item["lecturer"]["employee"]["name"];
          }
          if (item["student_id"] !== null) {
            res.role = "Student";
            res.url = `/mahasiswa/${item["student_id"]}`;
            res.name = item["student"]["name"];
          }
          if (item["registration_id"] !== null) {
            res.role = "Public";
            res.url = `/penerimaan/${item["registration_id"]}`;
            res.name = item["registration"]["name"];
          }
          return res;
        }));
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
