import { Tabs, Tab } from '@blueprintjs/core'
import React, { useState } from 'react'
import Bio from './Bio'
import Citizen from './Citizen'
import Miscellaneous from './Miscellaneous'
import Student from './Student'

const NavigationBar = () => {
  const [selectedTab, setSelectedTab] = useState('biodata');
  return (
    <Tabs onChange={setSelectedTab} renderActiveTabPanelOnly selectedTabId={selectedTab}>
      <Tab id="biodata" title="Biodata" panel={<Bio nextPage={() => setSelectedTab('kemahasiswaan')} />} />
      <Tab id="kemahasiswaan" title="Kemahasiswaan" panel={<Student nextPage={() => setSelectedTab('kewarganegaraan')} />} />
      <Tab id="kewarganegaraan" title="Kewarganegaraan" panel={<Citizen nextPage={() => setSelectedTab('lain-lain')} />} />
      <Tab id="lain-lain" title="Lain - lain" panel={<Miscellaneous />} />
    </Tabs>
  )
}

export default NavigationBar
