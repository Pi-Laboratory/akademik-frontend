import { H4 } from '@blueprintjs/core'
import { Box, Divider as Div } from 'components'
import React, { useState } from 'react'
import AdvancedSearch from './AdvancedSearch';
import { SimpleSearch } from './SimpleSearch';
import StudentList from './StudentList';

const currentYear = new Date().getFullYear();

export const programs = Array.apply(null, { length: 10 }).map((program, i) => ({
  id: i + 1,
  title: `${i % 2 === 0 ? 'D3' : 'D4'} Prodi - ${i + 1}`,
  year: currentYear - i % 2
}));

const Students = () => {
  const [mode, setMode] = useState('simple')

  return (
    <Box sx={{ px: 3 }}>
      <H4>Mahasiswa</H4>
      {
        mode === 'simple' ?
        <SimpleSearch onSwitchMode={setMode} />
        :
        <AdvancedSearch onSwitchMode={setMode} />
      }
      <Div />
      <StudentList />
    </Box>
  )
}

export default Students
