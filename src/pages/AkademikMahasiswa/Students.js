import { Callout, H4 } from '@blueprintjs/core'
import { Box, Divider as Div } from 'components'
import React, { useState } from 'react'
import AdvancedSearch from './AdvancedSearch';
import List from './DaftarMahasiswa/List';
import { SimpleSearch } from './SimpleSearch';

const currentYear = new Date().getFullYear();

export const programs = Array.apply(null, { length: 10 }).map((program, i) => ({
  id: i + 1,
  title: `${i % 2 === 0 ? 'D3' : 'D4'} Prodi - ${i + 1}`,
  year: currentYear - i % 2
}));

const Students = () => {
  const [mode, setMode] = useState('simple');
  const [found, toggleFound] = useState(false);

  return (
    <Box sx={{ px: 3 }}>
      <H4>Mahasiswa</H4>
      {
        mode === 'simple' ?
          <SimpleSearch onSwitchMode={setMode} onSearch={() => toggleFound(true)} />
          :
          <AdvancedSearch onSwitchMode={setMode} onSearch={() => toggleFound(true)} />
      }
      <Div />
      { found &&
        <>
          <Callout intent="primary">
            Ditemukan 4 data yang cocok
          </Callout>
          <Box sx={{ mt: 2 }}>
          <List length={4} />
          </Box>
        </>
      }
    </Box>
  )
}

export default Students
