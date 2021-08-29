import { Flex } from "components";
import List from "./List";

const Layout = () => {
  return (
    <Flex sx={{
      flexDirection: "column",
    }}>
      <List />
    </Flex>
  );
}

export default Layout;