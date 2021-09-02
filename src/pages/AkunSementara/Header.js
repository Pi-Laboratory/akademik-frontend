import { Classes, Tag } from "@blueprintjs/core";
import { Box } from "components";
import { useLocation, useParams, useRouteMatch } from "react-router";

const Header = () => {
  const params = useParams();
  const match = useRouteMatch();
  const location = useLocation();
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