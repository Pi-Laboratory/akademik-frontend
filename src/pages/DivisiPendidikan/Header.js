import { Classes, Tag } from "@blueprintjs/core";
import { Box } from "components";
import { useLocation, useParams, useRouteMatch } from "react-router";

const Header = () => {
  const params = useParams();
  return (
    <Box sx={{ ml: 3 }}>
      <Box as="h2" className={`${Classes.HEADING}`}>
        <span>Divisi Pendidikan</span>
        {params.nip && <Tag>{params.nip}</Tag>}
      </Box>
    </Box >
  )
}

export default Header;