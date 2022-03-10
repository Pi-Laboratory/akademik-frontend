import { Flex, Divider, Box } from 'components'
import Router from './Router'
import Header from './Header'
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import { useNav } from 'pages/Root/hoc';
import { forwardRef } from 'react/cjs/react.development';
import { Classes } from '@blueprintjs/core';

export const Layout = () => {
  const { path } = useRouteMatch();
  const navigation = useNav(path);
  const { pathname } = useLocation();
  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Header />
      <Box className={Classes.TABS} sx={{ px: 3 }}>
        <Box as="div" className={Classes.TAB_LIST} role="tablist">
          {navigation.items.map((item) => (
            <NavLink
              as="a"
              to={item.rendered}
              key={item.path}
              className={Classes.TAB}
              component={forwardRef(({ navigation, ...props }, ref) => (
                <Box
                  ref={ref}
                  {...props}
                  aria-selected={pathname === item.rendered}
                >
                  {item.title}
                </Box>
              ))}
            />
          ))}
        </Box>
      </Box>
      <Divider sx={{ mt: 0, mb: 4 }} />
      <Router />
    </Flex>
  )
}
