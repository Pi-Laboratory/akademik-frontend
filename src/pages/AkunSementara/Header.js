import { Classes, Tag } from "@blueprintjs/core";
import { Box } from "components";
import { useParams } from "react-router";

const Header = () => {
  const params = useParams();
  return (
    <Box sx={{ ml: 3, mb: 3 }}>
      <Box as="h2" className={`${Classes.HEADING}`}>
        <span>Akun Sementara</span>
        {params.nip && <Tag>{params.nip}</Tag>}
      </Box>
    </Box >
  )
}

export default Header;