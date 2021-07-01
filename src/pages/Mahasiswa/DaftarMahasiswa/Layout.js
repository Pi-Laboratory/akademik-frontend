import { Box, Divider } from 'components'
import React from 'react'
import List from './List'
import Header from './Header'

export const Layout = () => {
  return (
    <Box>
      <Header />
      <Divider />
      <Box sx={{px: 3}}>
        <List />
      </Box>
    </Box>
  )
}
