import { Button, Classes } from "@blueprintjs/core";
import { Box, Flex } from "components";
import ListProvider from "components/list";
import { useState } from "react";
import { useParams } from "react-router";
import MahasiswaList from "./Mahasiswa.List";
import MahasiswaTrade from "./Mahasiswa.Trade";

const Mahasiswa = () => {
  const params = useParams();
  const [isTrade, setIsTrade] = useState(false);
  return (
    <Box>
      <Flex>
        <h4 className={Classes.HEADING}>Mahasiswa</h4>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button
            small={true}
            minimal={true}
            text={isTrade ? "Cancel" : "Trade"}
            onClick={() => {
              setIsTrade(state => !state);
            }}
          />
        </Box>
      </Flex>
      {!isTrade &&
        <ListProvider filter={{
          "class_id": params.id,
          "generation": null
        }}>
          <MahasiswaList />
        </ListProvider>
      }
      {isTrade && <MahasiswaTrade />}
    </Box>
  )
}

export default Mahasiswa;