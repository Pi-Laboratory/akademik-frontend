import { Button, H4, MenuItem } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import { Box } from 'components'
import React from 'react'

const currentYear = new Date().getFullYear();

export const programs = Array.apply(null, { length: 10 }).map((program, i) => ({
  id: i + 1,
  title: `${i % 2 === 0 ? 'D3' : 'D4'} Prodi - ${i + 1}`,
  year: currentYear - i % 2
}));

const StudentSelect = Select.ofType();

const Students = () => {
  return (
    <Box sx={{ px: 3 }}>
      <H4>Mahasiswa</H4>
      <StudentSelect items={programs} itemRenderer={program =>
      (<MenuItem
        text={program.title}
        key={program.id}
      />)
      }>
        <Button text="Pilih Prodi" rightIcon="caret-down" />
      </StudentSelect>
    </Box>
  )
}

export default Students
