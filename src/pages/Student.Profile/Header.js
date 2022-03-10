import { H2 } from '@blueprintjs/core'
import { Box } from 'components'
import React from 'react'

const Header = () => {
  return (
    <Box sx={{ px: 3, mb: 3 }}>
      <Box as={H2} sx={{ m: 0 }}>Data Diri</Box>
    </Box>
  )
}

export default Header;
