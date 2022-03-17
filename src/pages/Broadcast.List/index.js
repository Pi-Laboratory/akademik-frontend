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
    };
    return [filter, url];
  }, [location["search"]]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListProvider
      filter={filter}
      onFilterChange={({ role }) => {
        filterSearch.set("role", role);
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