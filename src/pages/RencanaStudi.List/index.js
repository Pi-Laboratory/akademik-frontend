import ListProvider from "components/list";
import { Layout } from "./Layout";

const List = () => {
  return (
    <ListProvider
      filter={{
        "generation": String(new Date().getFullYear()),
        "study_program_id": undefined
      }}
    >
      <Layout />
    </ListProvider>
  )
}

export default List;