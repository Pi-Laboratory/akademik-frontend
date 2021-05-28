import { Button } from '@blueprintjs/core'
import { Box } from 'components'
import React from 'react'

const AdvancedSearch = ({ onSwitchMode }) => {
  return (
    <Box>
      <Button text="Pencarian Sederhana" onClick={() => onSwitchMode('simple')} />
      
    </Box>
  )
}

export default AdvancedSearch
