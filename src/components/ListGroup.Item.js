import { Box } from "components";

const ListGroupItem = ({ children, ...props }) => {
  return (
    <Box className="list-group-item" {...props}>{children}</Box>
  )
}

export default ListGroupItem;