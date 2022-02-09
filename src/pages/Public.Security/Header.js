import { H2 } from '@blueprintjs/core'
import { Box } from 'components'
import React from 'react'

const Header = () => {
  return (
    <Box sx={{ px: 3, mb: 4 }}>
      <Box as={H2} sx={{ m: 0 }}>Security</Box>
    </Box>
  )
}

export default Header;
