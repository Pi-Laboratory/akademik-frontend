import { Button,ButtonGroup } from '@blueprintjs/core';
import { Box, Flex, ListGroup } from 'components';
import React from 'react';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const { path } = useRouteMatch();
  return (
<<<<<<< HEAD
    <Box as={HTMLTable} interactive={true} sx={{ width: "100%" }}>
      <Box as="thead" sx={{
        "th": {
          verticalAlign: 'middle !important',
        }
      }}>
        <tr>
          <th rowSpan={2}>No</th>
          <th rowSpan={2}>Angkatan</th>
          <Box as="th" sx={{ textAlign: 'center !important' }} colSpan={7}>Jumlah Mahasiswa</Box>
          <th rowSpan={2}>Aksi</th>
        </tr>
        <tr>
          <th>Aktif</th>
          <th>Lulus</th>
          <th>Cuti</th>
          <th>Drop Out</th>
          <th>Keluar</th>
          <th>Non-aktif</th>
          <th>Total</th>
        </tr>
      </Box>
      <tbody>
        {programs.map((program, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{`${(currentYear - i) - 1}/${(currentYear - i)}`}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td><Button onClick={() => push(`${path}/angkatan/1`)} icon="eye-open" /></td>
          </tr>
=======
    <>
      <ListGroup>
        {Array(20).fill(0).map((_, idx) => (
          <ListGroup.Item key={idx}>
            <Flex>
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
>>>>>>> 9626e5e8d25333b178efebea36e3538921bcdb97
        ))}
      </ListGroup>
      <Flex sx={{ my: 3, justifyContent: "center" }}>
        <Button minimal={true} icon="chevron-left" text="Previous" />
        <ButtonGroup>
          <Button text="1" active={true} />
          <Button text="2" />
          <Button text="3" />
        </ButtonGroup>
        <Button minimal={true} text="Next" rightIcon="chevron-right" />
      </Flex>
    </>
  )
}

export default StudentList
