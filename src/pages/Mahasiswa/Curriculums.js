import { H4 } from '@blueprintjs/core'
import { Box } from 'components'
import React from 'react'
import List from './List';

const currentYear = new Date().getFullYear();

const Curriculums = () => {
  return (
    <Box sx={{ px: 3 }}>
      <H4>Kurikulum</H4>
      <Box as="p">Semester Genap {currentYear - 1}/{currentYear}</Box>
      <List />
    </Box>
  )
}

export default Curriculums
