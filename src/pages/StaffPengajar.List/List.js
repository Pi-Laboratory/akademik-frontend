import { Checkbox, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Flex, ListGroup, Select, useClient, useList } from "components";
import Filter from "./Filter";
import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { Pagination } from "components/Pagination";

const List = () => {
  const client = useClient();
  const { items, setItems, setPaging, selectedItem, dispatchSelectedItem } = useList();

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const res = await client["lecturers"].find({
          query: {
            $select: ["id", "name", "front_degree", "back_degree", "nip", "nidn", "id_number"]
          }
        });
        console.log(res);
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
  }, [client]);
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
      {items && items.map((value) => (
        <ListGroup.Item key={value["id"]}>
          <Flex>
            <Box sx={{ width: 24, px: 0, flexShrink: 0 }}>
              <Checkbox onChange={(e) => {
                dispatchSelectedItem({
                  type: "toggle",
                  data: {
                    name: value["id"],
                    value: e.target.checked
                  }
                })
              }} />
            </Box>
            <Box sx={{ flexGrow: 1, px: 2, mr: 3 }}>
              <Box>
                <Link to={`/staff-dan-pengajar/${value["id"]}`}>
                  {`${value["front_degree"]} ${value["name"]} ${value["back_degree"]}`}
                </Link>
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {value["nip"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                NIDN
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {value["id_number"]}
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                NIK
              </Box>
              <Box sx={{ color: "gray.5" }}>
                {value["id_number"]}
              </Box>
            </Box>
          </Flex>
        </ListGroup.Item>
      ))}
    </>
  )
}

export default List;