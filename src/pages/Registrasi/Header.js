import { H2, H3 } from '@blueprintjs/core'
import { Flex, Box } from 'components'
import React from 'react'
import logo from 'assets/imgs/logo-polimdo.png'

const Header = () => {
  return (
    <Flex sx={{ my: 3, flexDirection: 'column' }}>
      <img src={logo} style={{ width: 150, height: 150, margin: '12px auto' }} alt="logopoli" />
      <H2 style={{ textAlign: 'center' }}>Pendaftaran Mahasiswa Baru</H2>
      <Box as={H3} className="bp3-text-muted" style={{textAlign: 'center', fontWeight: 'normal'}}>Politeknik Negeri Manado</Box>
    </Flex>
  )
}

export default Header
