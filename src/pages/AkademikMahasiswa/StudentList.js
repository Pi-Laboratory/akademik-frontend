import { Button, Checkbox, HTMLTable } from '@blueprintjs/core'
import { Box, Flex, ListGroup, Select } from 'components'
import React, { useReducer } from 'react'
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { programs } from './Students'

const currentYear = new Date().getFullYear();

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
      break;
    case "add":
      return [...state, action.data.name];
    case "remove":
      return [...state.filter(item => item !== action.data.name)];
    default: return state;
  }
}

const StudentList = () => {
  const { push } = useHistory();
  const { path } = useRouteMatch();
  const [selectedItem, dispatchSelectedItem] = useReducer(selectedItemReducer, []);
  return (
    <ListGroup>
      <ListGroup.Header>
        <Flex sx={{ alignItems: "center" }}>
          <Box sx={{ width: 40, flexShrink: 0, }}>
            <Checkbox
              style={{ marginBottom: 0 }}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexShrink: 0 }}>
            <Select
              minimal={true}
              label="Status"
              options={[
                { label: "Aktif", value: true },
                { label: "Tidak Aktif", value: false }
              ]}
            />
            <Select
              minimal={true}
              label="Program Studi"
              options={[
                { label: "Teologi", value: 0 },
                { label: "Teknik Elektro", value: 0 },
                { label: "Teknik Arsitektur", value: 1 },
                { label: "Akuntansi", value: 2 },
                { label: "Teknik Sipil", value: 3 },
                { label: "Bahasa Inggris", value: 3 },
              ]}
            />
          </Box>
        </Flex>
      </ListGroup.Header>
      {Array(20).fill(0).map((_, idx) => (
        <ListGroup.Item key={idx}>
          <Flex>
            <Box sx={{ width: 40, flexShrink: 0 }}>
              <Checkbox onChange={(e) => {
                console.log(e.target.checked);
                dispatchSelectedItem({
                  type: "toggle",
                  data: {
                    name: idx,
                    value: e.target.checked
                  }
                })
              }} />
            </Box>
            <Box sx={{ flexGrow: 1, mr: 3, fontSize: 2 }}>
              <Box sx={{ fontSize: 0 }}>Angkatan</Box>
              <div>
                <Link to={`${path}/angkatan/1`}>
                  {2000 + idx}/{2000 + idx - 1}
                </Link>
              </div>
            </Box>
            <Flex sx={{
              width: "75%",
              flexShrink: 0,
              "> div": {
                flexGrow: 1,
                width: `${100 / 7}%`,
                "div:first-of-type": {
                  fontWeight: "bold",
                  color: "gray.8"
                },
                "div:last-of-type": {
                  color: "gray.5",
                  fontSize: 0
                }
              }
            }}>
              <div>
                <div>
                  {Math.round(Math.random() * 12093)}
                </div>
                <div>Aktif</div>
              </div>
              <div>
                <div>
                  {Math.round(Math.random() * 12093)}
                </div>
                <div>Lulus</div>
              </div>
              <div>
                <div>
                  {Math.round(Math.random() * 12093)}
                </div>
                <div>Cuti</div>
              </div>
              <div>
                <div>
                  {Math.round(Math.random() * 12093)}
                </div>
                <div>Drop Out</div>
              </div>
              <div>
                <div>
                  {Math.round(Math.random() * 12093)}
                </div>
                <div>Keluar</div>
              </div>
              <div>
                <div>
                  {Math.round(Math.random() * 12093)}
                </div>
                <div>Non-Aktif</div>
              </div>
              <div>
                <div>
                  {Math.round(Math.random() * 12093)}
                </div>
                <div>Total</div>
              </div>
            </Flex>
          </Flex>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default StudentList
