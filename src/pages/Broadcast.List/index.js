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
      "role": url.get("role") || "",
      "study_program_id": url.get("study_program_id") || "",
    };
    return [filter, url];
  }, [location["search"]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListProvider
      filter={filter}
      onFilterChange={(value, { dispatchSelectedItem }) => {
        for (let v of ["role", "study_program_id"]) {
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
      <Layout />
    </ListProvider>
  )
}

export default List;