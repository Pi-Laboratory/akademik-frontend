import { Flex } from 'components'
import React from 'react'
import Router from './Router'
import Header from './Header'

export const Layout = () => {

  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Header />
      <Router />
    </Flex>
  )
}
