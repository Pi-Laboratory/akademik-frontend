import { H2 } from '@blueprintjs/core'
import { Box, Divider, Flex } from 'components'
import { useNav } from 'pages/Root/hoc'
import Router from './Router'
import { useHistory } from 'react-router'
import List from './List'

export const Layout = () => {
  const { location: { pathname } } = useHistory();
  const navigation = useNav(pathname);
  console.log(navigation);
  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Router />
    </Flex>
  )
}
