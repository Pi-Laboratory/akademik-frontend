import { Box } from "components";
import ListGroupHeader from "./ListGroup.Header";
import ListGroupItem from "./ListGroup.Item";

export const ListGroup = ({ children, ...props }) => {
  return (
    <Box className="list-group" {...props}>{children}</Box>
  )
}

ListGroup.Header = ListGroupHeader;
ListGroup.Item = ListGroupItem;