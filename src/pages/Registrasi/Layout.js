import { Card } from '@blueprintjs/core'
import { Box } from 'components'
import Header from './Header'
import React from 'react'
import NavigationBar from './NavigationBar'

const Layout = () => {
  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', py: 3 }}>
      <Header />
      <Card>
        <NavigationBar />
      </Card>
    </Box>
  )
}

export default Layout
