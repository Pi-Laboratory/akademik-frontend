import ListProvider from "components/list";
import { useClient } from "components";
import Layout from "./Layout";
import { useHistory, useLocation } from "react-router-dom";
import { useMemo } from "react";

const JadwalList = () => {
  const location = useLocation();
  const history = useHistory();
  const { account } = useClient();
  const [filter, filterSearch] = useMemo(() => {
    const url = new URLSearchParams(location["search"]);
    const filter = {
      "lecturer_id": account["lecturer_id"],
      "study_program_id": url.get("study_program_id")
    };
    return [filter, url];
  }, [location["search"], account["lecturer_id"]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListProvider
      filter={filter}
      onFilterChange={(value) => {
        for (let v of ["lecturer_id", "study_program_id"]) {
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

export default JadwalList;