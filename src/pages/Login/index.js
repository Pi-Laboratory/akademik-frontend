import { AnchorButton, Button } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { useState } from "react";
import Email from "./Email";
import { host } from "components/client";

const Login = () => {
  const [logType, setLogType] = useState(null);

  return (
    <Box sx={{
      width: 275,
      mx: "auto",
      mt: 4,
    }}>
      <Box sx={{
        borderRadius: 4,
        border: "1px solid white",
        borderColor: "gray.3",
        py: 4,
        bg: "white"
      }}>
        <Box sx={{ px: 3 }}>
          {logType === "email" &&
            <Email
              onBack={() => {
                setLogType(null);
              }}
            />}
          {logType === null &&
            <Box>
              <Box sx={{ px: 3, mb: 3, textAlign: "center" }}>
                Pilih cara login Anda
              </Box>
              <Flex sx={{
                flexDirection: "column",
              }}>
                <Box>
                  <Button
                    intent="primary"
                    fill={true}
                    text="Login dengan Email"
                    onClick={() => {
                      setLogType("email");
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    py: 3,
                    width: "100%",
                    textAlign: "center"
                  }}
                >Atau</Box>
                <Box>
                  <AnchorButton
                    href={`${host.origin}/oauth/google`}
                    intent="danger"
                    fill={true}
                    text="Login dengan Google"
                  />
                </Box>
              </Flex>
            </Box>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default Login;