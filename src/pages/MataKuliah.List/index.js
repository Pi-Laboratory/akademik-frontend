import ListProvider from "components/list";
import Layout from "./Layout";

const ListMatakuliah = () => {
  return (
    <ListProvider filter={{
      "major_id": null,
      "study_program_id": null
    }}>
      <Layout />
    </ListProvider>
  )
}

export default ListMatakuliah;