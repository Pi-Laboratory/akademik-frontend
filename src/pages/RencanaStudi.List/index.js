import ListProvider from "components/list";
import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Layout } from "./Layout";

const List = () => {
  const location = useLocation();
  const history = useHistory();

  const [filter, filterSearch] = useMemo(() => {
    const url = new URLSearchParams(location["search"]);
    const filter = {
      "generation": url.get("generation") || String(new Date().getFullYear()),
      "study_program_id": url.get("study_program_id"),
    };
    return [filter, url];
  }, [location["search"]]);

  return (
    <ListProvider
      filter={filter}
      onFilterChange={({ generation, study_program_id }) => {
        filterSearch.set("generation", generation);
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

export default List;