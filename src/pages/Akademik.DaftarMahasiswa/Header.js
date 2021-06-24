import { H4 } from '@blueprintjs/core'
import { Box } from 'components'
import React from 'react'

const Header = () => {
  return (
    <Box sx={{ px: 3, pt: 3 }}>
      <H4>Daftar Mahasiswa</H4>
      <p>Program Studi: D4 Teknik</p>
      <p className="bp3-text-muted">Angkatan 2020/2021</p>
    </Box>
  )
}

export default Header
