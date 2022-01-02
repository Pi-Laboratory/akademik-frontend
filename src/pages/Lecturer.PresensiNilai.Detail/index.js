import ListProvider from "components/list";
import { PageProvider } from "./hoc";
import Layout from "./Layout";

const PresensiDetail = () => {
  return (
    <PageProvider>
      <ListProvider>
        <Layout />
      </ListProvider>
    </PageProvider>
  )
}

export default PresensiDetail;