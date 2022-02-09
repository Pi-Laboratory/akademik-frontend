import { Flex, Divider } from 'components'
import Header from './Header'
import { Detail } from './Detail'

export const Layout = () => {
  return (
    <Flex sx={{ py: 4, flexDirection: 'column', height: '100%' }}>
      <Header />
      <Divider />
      <Detail />
    </Flex>
  )
}
