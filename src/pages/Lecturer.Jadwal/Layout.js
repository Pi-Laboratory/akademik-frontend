import { H2  } from '@blueprintjs/core'
import { Box, Divider, Flex } from 'components'
import React from 'react'
import Router from './Router'

export const Layout = () => {
  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 3 }}>
        <Box as={H2} sx={{ mb: 3 }}>Jadwal</Box>
      </Box>
      <Divider sx={{ mt: 0, mb: 2 }} />
      <Router />
    </Flex>
  )
}

