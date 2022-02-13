import { Box } from 'components'
import Header from './Header'
import { Form } from './Form'

const Layout = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Header />
      <Box sx={{
        maxWidth: '512px',
        mx: 'auto',
        p: 3,
        borderRadius: 4,
        border: "1px solid white",
        borderColor: "gray.3",
        bg: "white"
      }}>
        <Form />
      </Box>
      <Box sx={{
        textAlign: "center",
        my: 4,
        fontSize: 0,
      }}>
        <a href="mailto:ilomon10@gmail.com">Laporkan sesuatu</a>
      </Box>
    </Box>
  )
}

export default Layout
