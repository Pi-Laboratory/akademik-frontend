import { Box, Container, Flex } from "components";

const Footer = () => {
  return (
    <Container>
      <Box
        sx={{
          borderTopColor: "gray.3",
          borderTopWidth: 1,
          borderTopStyle: "solid",
          py: 4,
        }}
      >
        <Flex>
          <Box>© 2021 Pi Laboratory, Inc.</Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>App ver. 0.0.1</Box>
        </Flex>
      </Box>
    </Container>
  );
}

export default Footer;