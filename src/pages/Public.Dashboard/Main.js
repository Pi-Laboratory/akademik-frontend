import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { NonIdealState, Callout, AnchorButton } from "@blueprintjs/core";
import { Box } from "components";

const Main = () => {
  const [items] = useState([{
    intent: "warning",
    title: "Password diperlukan",
    description: (
      <>
        <Box sx={{ mb: 2 }}>
          Selesaikan proses login Anda dengan menentukan password
        </Box>
        <Box>
          <Link
            to="/security"
            component={forwardRef(({ navigate, ...props }, ref) => (
              <AnchorButton
                ref={ref}
                {...props}
                outlined={true}
                text="Masukan sekarang"
              />
            ))} />
        </Box>
      </>
    )
  }, {
    intent: "danger",
    title: "Data tidak lengkap",
    description: (
      <>
        <Box sx={{ mb: 2 }}>
          Harap lengkapi data Anda
        </Box>
        <Box>
          <Link
            to="/bio"
            component={forwardRef(({ navigate, ...props }, ref) => (
              <AnchorButton
                ref={ref}
                {...props}
                outlined={true}
                text="Masukan sekarang"
              />
            ))} />
        </Box>
      </>
    )
  }]);
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        {items.map((item, idx) => {
          return (
            <Box key={idx} sx={{ mb: 3 }}>
              <Callout intent={item.intent} title={item.title}>
                {item.description}
              </Callout>
            </Box>
          )
        })}
        {items.length === 0 &&
          <NonIdealState
            icon="clean"
            description="Tidak ada peberitahuan baru"
          />}
      </Box>
    </Box>
  );
}

export default Main;