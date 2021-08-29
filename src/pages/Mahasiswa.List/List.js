import { Checkbox } from '@blueprintjs/core'
import { Box, Flex, ListGroup, useClient } from 'components'
import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'

function selectedItemReducer(state, action) {
  switch (action.type) {
    case "toggle":
      console.log(state);
      if (action.data.value) {
        return selectedItemReducer(state, {
          type: "add",
          data: action.data
        });
      } else {
        return selectedItemReducer(state, {
          type: "remove",
          data: action.data
        });
      }
    case "add":
      return [...state, action.data.name];
    case "remove":
      return [...state.filter(item => item !== action.data.name)];
    default: return state;
  }
}

const List = () => {
  const client = useClient();
  const [selectedItem, dispatchSelectedItem] = useReducer(selectedItemReducer, []);
  const [list, setList] = useState(null);
  const [paging, setPaging] = useState({
    total: null,
    limit: null,
    skip: 0,
  });
  const [studyPrograms, setStudyPrograms] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["study-programs"].find({
          query: {
            $select: ["id", "name"]
          }
        });
        setStudyPrograms(res.data.map(({ id, name }) => ({ label: name, value: id })));
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["students"].find({
          query: {
            $select: ["id", "name"]
          }
        });
        console.log(res);
        setList(res.data);
        setPaging({
          total: res.total,
          limit: res.limit,
          skip: res.skip
        });
      } catch (err) {
        console.error(err);
        setList([]);
      }
    }
    fetch();
  }, [client,]);

  return (
    <>
      {Array(25).fill(0).map((_, idx) => (
        <ListGroup.Item key={idx}>
          <Flex>
            <Box sx={{ width: 40, flexShrink: 0 }}>
              <Checkbox onChange={(e) => {
                console.log(e);
              }} />
            </Box>
            <Box sx={{ width: "15%", flexShrink: 0 }}>
              {Math.round(Math.random() * 12093)}
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3 }}>
              <Box>
                <Link to={`mahasiswa/${idx}`}>
                  Prof. Dr. Imanuel Pundoko, S.Th.
                </Link>
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
