import { Classes, Tag } from "@blueprintjs/core";
import { Box } from "components";
import { useLocation, useParams, useRouteMatch } from "react-router";

const Header = () => {
  const params = useParams();
  const match = useRouteMatch();
  const location = useLocation();
  console.log(params, location, match);
  return (
    <Box sx={{ ml: 3 }}>
      <Box as="h2" className={`${Classes.HEADING}`}>
        <span>Presensi Kelas</span>
        {params.nip && <Tag>{params.nip}</Tag>}
      </Box>
    </Box >
  )
}

export default Header;