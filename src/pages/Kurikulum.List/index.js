import React, { useMemo } from 'react'
import ListProvider from 'components/list'
import { Layout } from './Layout'
import { useHistory, useLocation } from 'react-router-dom';

const ListKurikulum = () => {
  const location = useLocation();
  const history = useHistory();

  const [filter, filterSearch] = useMemo(() => {
    const url = new URLSearchParams(location["search"]);
    const filter = {
      "year": url.get("year") || String(new Date().getFullYear()),
      "study_program_id": url.get("study_program_id") || "",
    };
    return [filter, url];
  }, [location["search"]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListProvider
      filter={filter}
      onFilterChange={({ year, study_program_id }) => {
        filterSearch.set("year", year);
        filterSearch.set("study_program_id", study_program_id);
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
