import InjectProvider from "components/inject";
import Layout from "./Layout";
import Header from '../Kurikulum/Header';
import { Divider } from "components";

const Detail = () => {
  return (
    <InjectProvider state={null}>
      <Header />
      <Divider sx={{ mt: 0, mb: `8px` }} />
      <Layout />
    </InjectProvider>
  )
}

export default Detail;