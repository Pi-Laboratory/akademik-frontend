import React, { useMemo } from 'react'
import ListProvider from 'components/list'
import { Layout } from './Layout'
import { useHistory, useLocation } from 'react-router-dom';

export const filterField = ["year", "study_program_id", "name"];

const ListKurikulum = () => {
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
      onFilterChange={(value) => {
        for (let v of filterField) {
          if (value[v]) filterSearch.set(v, value[v]);
          else filterSearch.delete(v);
        }
        history.replace({
          search: filterSearch.toString()
        });
      }}
    >
      <Layout />
    </ListProvider>
  )
}

export default ListKurikulum;
