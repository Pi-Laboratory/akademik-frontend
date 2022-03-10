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
      "study_program_id": url.get("study_program_id") || "",
      "status": url.get("status") || "",
    };
    return [filter, url];
  }, [location["search"]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListProvider
      filter={filter}
      onFilterChange={({ study_program_id, status }) => {
        filterSearch.set("study_program_id", study_program_id);
        filterSearch.set("status", status);
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