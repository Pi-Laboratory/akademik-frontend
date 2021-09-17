import { H2, Tabs, Tab, Classes } from '@blueprintjs/core'
import { Box, Divider, Flex } from 'components'
import { useNav } from 'pages/Root/hoc'
import React from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import Router from './Router'

export const Layout = () => {
  const { location: { pathname } } = useHistory();
  const { path } = useRouteMatch();
  const navigation = useNav(path);

  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 3 }}>
        <Box as={H2} sx={{ m: 0, mb: 3 }}>Divisi Pendidikan</Box>
        <Box className={Classes.TABS}>
          <Box className={Classes.TAB_LIST} role="tablist">
            {
              navigation.items
              && navigation.items.map((item, i) => {
                if (item.hide) return null;

                let active = false;
                active = pathname.indexOf(item.path) === 0;
                return (
                  <Box
                    key={i}
                    className={Classes.TAB}
                    aria-selected={active}
                    onClick={() => navigation.go(item.path)}
                  >
                    {item.text}
                  </Box>
                );
              })
            }
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: 0, mb: pathname.includes('detail') ? 0 : `8px` }} />
      <Router />
    </Flex>
  )
}

