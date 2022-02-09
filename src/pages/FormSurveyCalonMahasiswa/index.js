import ListProvider from "components/list";
import { useParams } from "react-router-dom";
import { PageProvider } from "./hoc";
import Layout from "./Layout";

const FormSurveyCalonMahasiswa = () => {
  const params = useParams();
  return (
    <PageProvider>
      <ListProvider
        filter={{
          "subject_lecturer_id": params["subject_lecturer_id"]
        }}
      >
        <Layout />
      </ListProvider>
    </PageProvider>
  )
}

export default FormSurveyCalonMahasiswa;