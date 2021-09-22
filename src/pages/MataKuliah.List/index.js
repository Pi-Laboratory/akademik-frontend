import ListProvider from "components/list";
import Layout from "./Layout";

const ListMatakuliah = () => {
  return (
    <ListProvider filter={{
      "study_program_id": null
    }}>
      <Layout />
    </ListProvider>
  )
}

export default ListMatakuliah;