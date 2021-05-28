import { Box } from "components";

const ListGroupHeader = ({ children, ...props }) => {
  return (
    <Box className="list-group-item list-group-header" {...props}>{children}</Box>
  )
}

export default ListGroupHeader;