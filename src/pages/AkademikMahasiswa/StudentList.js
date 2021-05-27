import { Button, HTMLTable } from '@blueprintjs/core'
import { Box } from 'components'
import React from 'react'
import { programs } from './Students'

const currentYear = new Date().getFullYear();

const StudentList = () => {
  return (
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
          <tr>
            <td>{i + 1}</td>
            <td>{`${(currentYear - i) - 1}/${(currentYear - i)}`}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td>{Math.round(Math.random() * 1000)}</td>
            <td><Button icon="eye-open" /></td>
          </tr>
        ))}
      </tbody>
    </Box>
  )
}

export default StudentList
