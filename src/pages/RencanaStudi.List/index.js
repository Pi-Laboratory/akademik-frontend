import ListProvider from "components/list";
import Layout from "./Layout";

const List = () => {
  return (
    <ListProvider filter={{
      "study_program_id": null
    }}>
      <Layout />
    </ListProvider>
  )
}

export default List;