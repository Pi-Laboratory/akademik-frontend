import { Card, H2 } from '@blueprintjs/core'
import { Box, Divider } from 'components'
import React from 'react'
import NavigationBar from './NavigationBar'

const Layout = () => {
  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', py: 3 }}>
      <H2>PPMB</H2>
      <Divider />
      <Card>
        <NavigationBar />
      </Card>
    </Box>
  )
}

export default Layout
