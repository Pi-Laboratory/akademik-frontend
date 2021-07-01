import { Flex } from 'components'
import { useNav } from 'pages/Root/hoc'
import Router from './Router'
import { useHistory } from 'react-router'

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
