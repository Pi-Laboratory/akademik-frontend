import { Box } from "components";
import ListGroupHeader from "./ListGroup.Header";
import ListGroupItem from "./ListGroup.Item";

export const ListGroup = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{
        borderRadius: 8,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "gray.3",
        // bg: "white",
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

ListGroup.Header = ListGroupHeader;
ListGroup.Item = ListGroupItem;