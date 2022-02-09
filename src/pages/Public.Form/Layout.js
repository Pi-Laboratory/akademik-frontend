import { Flex, Divider } from 'components'
import Router from './Router'
import Header from './Header'

export const Layout = () => {
  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Header />
      <Divider />
      <Router />
    </Flex>
  )
}
