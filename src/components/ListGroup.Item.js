import { Box } from "components";

const ListGroupItem = ({ children, sx, ...props }) => {
  return (
    <Box
      sx={{
        padding: 3,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "gray.3",
        "&:last-of-type": {
          borderBottom: "none"
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default ListGroupItem;