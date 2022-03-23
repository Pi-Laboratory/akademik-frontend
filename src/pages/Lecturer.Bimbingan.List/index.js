import React, { useMemo } from 'react'
import ListProvider from 'components/list'
import { Layout } from './Layout'
import { useHistory, useLocation } from 'react-router-dom';
import { H2 } from '@blueprintjs/core';
import { Box, Divider } from 'components';

const DaftarMahasiswa = () => {
  const location = useLocation();
  const history = useHistory();

  const [filter, filterSearch] = useMemo(() => {
    const url = new URLSearchParams(location["search"]);
    const filter = {
      "generation": url.get("generation") || String(new Date().getFullYear()),
      "study_program_id": url.get("study_program_id") || "",
    };
    return [filter, url];
  }, [location["search"]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListProvider
      filter={filter}
      onFilterChange={(value) => {
        for (let v of ["generation", "study_program_id"]) {
          if (value[v]) filterSearch.set(v, value[v]);
          else filterSearch.delete(v);
        }
        history.replace({
          search: filterSearch.toString()
        });
      }}
    >
      <Box sx={{ px: 3, mb: 4 }}>
        <Box as={H2} sx={{ m: 0 }}>Bimbingan</Box>
      </Box>
      <Divider sx={{ m: 0 }} />
      <Layout />
    </ListProvider>
  )
}

export default DaftarMahasiswa
