import { HTMLTable } from '@blueprintjs/core';
import { Box } from 'components'
import React from 'react'
import { programs } from './Students'

const currentYear = new Date().getFullYear();

const List = () => {
  return (
    <Box as={HTMLTable} interactive={true} sx={{ width: "100%" }}>
      <thead>
        <tr>
          <th>No</th>
          <th>Angkatan</th>
          <th>Program Studi</th>
          <th>Kurikulum</th>
        </tr>
      </thead>
      <tbody>
        {Array(25).fill(0).map((_, idx) => (
          programs.map((program, index) => (
            <tr key={index}>
              {index === 0 &&
                <>
                  <td rowSpan={programs.length}>{idx + 1}</td>
                  <td rowSpan={programs.length}>{currentYear - idx}</td>
                </>}
              <td>
                {program.title}
              </td>
              <td>{program.year}</td>
            </tr>
          ))
        ))}
      </tbody>
    </Box>
  )
}

export default List
