import ListProvider from "components/list";
import Layout from "./Layout";
import { useHistory, useLocation } from 'react-router-dom';
import { useMemo } from "react";

export const filterField = ["name"];

const ListJurusan = () => {
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
      <Layout />
    </ListProvider>
  )
}

export default ListJurusan;