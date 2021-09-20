import ListProvider from "components/list";
import Layout from "./Layout";

const ListJurusan = () => {
  return (
    <ListProvider filter={{
      "major_id": null
    }}>
      <Layout />
    </ListProvider>
  )
}

export default ListJurusan;