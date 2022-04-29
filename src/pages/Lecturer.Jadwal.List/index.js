import { useClient } from "components";
import ListProvider from "components/list";
import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Layout from "./Layout";

export const filterField = ["name", "study_program_id"];

const JadwalList = () => {
  const location = useLocation();
  const history = useHistory();
  const { account } = useClient();

  const [filter, filterSearch] = useMemo(() => {
    const url = new URLSearchParams(location["search"]);
    const filter = {};
    for (let f of filterField) {
      filter[f] = url.get(f) || "";
    }
    filter["lecturer_id"] = account["lecturer_id"];
    return [filter, url];
  }, [location["search"], account["lecturer_id"]]); // eslint-disable-line react-hooks/exhaustive-deps

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

export default JadwalList;