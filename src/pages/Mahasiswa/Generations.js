import { H4 } from '@blueprintjs/core'
import { Box, Divider } from 'components'
import React from 'react'
import StudentList from './StudentList'

const Generations = () => {
  return (
    <Box sx={{ px: 3, }}>
      <H4>Halaman Utama</H4>
      <Divider />
      <StudentList />
    </Box>
  )
}

export default Generations
