import { AnchorButton, Button } from "@blueprintjs/core";
import { Box, Flex } from "components";
import { useState } from "react";
import Email from "./Email";
import { host } from "components/client";
import { Link } from "react-router-dom";

const Login = () => {
  const [logType, setLogType] = useState(null);

  return (
    <Box sx={{
      width: 275,
      mx: "auto",
      pt: 4,
    }}>
      <Box sx={{ textAlign: "center", py: 3 }}>
        <Box as="h1" sx={{
          fontSize: 4,
          fontWeight: "lighter"
        }}>
          Masuk ke Akademik
        </Box>
      </Box>
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
                Pilih cara masuk Anda
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
      <Box sx={{
        mt: 3,
        p: 3,
        borderRadius: 4,
        border: "1px solid white",
        borderColor: "gray.3",
        textAlign: "center"
      }}>
        <Box as="span">
          Mahasiswa baru? Registrasi <Link to="/registrasi">disini</Link>.
        </Box>
      </Box>
      <Box sx={{
        textAlign: "center",
        my: 4,
        fontSize: 0,
      }}>
        <a href="mailto:ilomon10@gmail.com">Laporkan sesuatu</a>
      </Box>
    </Box>
  )
}

export default Login;