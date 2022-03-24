import React, { useMemo } from 'react'
import ListProvider from 'components/list'
import { Layout } from './Layout'
import { useHistory, useLocation } from 'react-router-dom';
import { H2 } from '@blueprintjs/core';
import { Box, Divider } from 'components';

export const filterField = ["lecturer_id", "generation", "study_program_id", "name"];

const DaftarMahasiswa = () => {
  const location = useLocation();
  const history = useHistory();

  const [filter, filterSearch] = useMemo(() => {
    const url = new URLSearchParams(location["search"]);
    const filter = {};
    for (let f of filterField) {
      filter[f] = url.get(f) || "";
    }
    return [filter, url];
  }, [location["search"]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListProvider
      filter={filter}
      onFilterChange={(value, { dispatchSelectedItem }) => {
        for (let v of filterField) {
          if (value[v]) filterSearch.set(v, value[v]);
          else filterSearch.delete(v);
        }
        history.replace({
          search: filterSearch.toString()
        });
        dispatchSelectedItem({
          type: "all",
          data: false
        })
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
