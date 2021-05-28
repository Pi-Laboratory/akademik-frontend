import { H2, Tabs, Tab } from '@blueprintjs/core'
import { Box, Divider, Flex } from 'components'
import { useNav } from 'pages/Root/hoc'
import React from 'react'
import { useHistory } from 'react-router'
import Router from './Router'

export const Layout = () => {
  const { push, location: {pathname} } = useHistory();
  const navigation = useNav();

  return (
    <Flex sx={{ py: 2, pt: 4, flexDirection: 'column' }}>
      <Box sx={{ px: 3 }}>
        <Box as={H2} sx={{ m: 0 }}>Akademik Kemahasiswaan</Box>
        <Box sx={{ mb: 3 }} as="p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur soluta similique id vel quae dolorem recusandae blanditiis, aliquid quidem deserunt, voluptas animi dicta laborum ex odio doloribus. Pariatur, ad deleniti.</Box>
        <Tabs selectedTabId={pathname} onChange={tab => push(tab)}>
          {
            navigation.items.map((item, i) => (
              <Tab id={item.path} key={i} title={item.text} />
            ))
          }
        </Tabs>
      </Box>
      <Divider sx={{ mt: 0 }} />
      <Router />
    </Flex>
  )
}
