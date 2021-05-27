import { H2, Tabs, Tab } from '@blueprintjs/core'
import { Box, Divider, Flex } from 'components'
import React from 'react'
import { useHistory } from 'react-router'
import Router from './Router'

export const Layout = () => {
  const { push, location: {pathname} } = useHistory();
  return (
    <Flex sx={{ py: 2, pt: 4, flexDirection: 'column' }}>
      <Box sx={{ px: 3 }}>
        <Box as={H2} sx={{ m: 0 }}>Akademik Kemahasiswaan</Box>
        <Box sx={{ mb: 3 }} as="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur soluta similique id vel quae dolorem recusandae blanditiis, aliquid quidem deserunt, voluptas animi dicta laborum ex odio doloribus. Pariatur, ad deleniti.</Box>
        <Tabs selectedTabId={pathname} onChange={tab => push(tab)}>
          <Tab id={`/akademik-mahasiswa/mahasiswa`} title="Mahasiswa" />
          <Tab id={`/akademik-mahasiswa/kurikulum`} title="Kurikulum" />
        </Tabs>
      </Box>
      <Divider sx={{ mt: 0 }} />
      <Router />
    </Flex>
  )
}
