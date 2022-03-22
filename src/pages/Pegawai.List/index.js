import { H2 } from "@blueprintjs/core";
import { Box, Divider } from "components";
import ListProvider from "components/list";
import Layout from "./Layout";

const PegawaiList = () => {
  return (
    <ListProvider>
      <Box sx={{ px: 3, mb: 4 }}>
        <Box as={H2} sx={{ m: 0 }}>Pegawai</Box>
      </Box>
      <Divider sx={{ m: 0 }} />
      <Layout />
    </ListProvider>
  )
}

export default PegawaiList;