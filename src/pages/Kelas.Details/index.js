import InjectProvider from "components/inject";
import Layout from "./Layout";

const Detail = () => {
  return (
    <InjectProvider state={null}>
      <Layout />
    </InjectProvider>
  )
}

export default Detail;