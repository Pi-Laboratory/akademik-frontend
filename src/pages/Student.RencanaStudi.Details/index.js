import Layout from "./Layout";
import ListProvider from "components/list";
import { useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  return (
    <ListProvider
      filter={{
        "student_id": params["student_id"],
        "study_id": ""
      }}
    >
      <Layout />
    </ListProvider>
  )
}

export default Detail;