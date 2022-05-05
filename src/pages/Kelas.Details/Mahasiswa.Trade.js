import { Button, Classes, Position, ProgressBar, Toaster } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { Box, Flex, useClient } from "components";
import { useInject } from "components/inject";
import ListProvider from "components/list";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import TradeProvider from "./hoc";
import MahasiswaTradeSource from "./Mahasiswa.Trade.Source";
import MahasiswaTradeTarget from "./Mahasiswa.Trade.Target";
import _get from "lodash/get"

const TradeToaster = Toaster.create({
  position: Position.TOP
});

const MahasiswaTrade = () => {
  const client = useClient();
  const params = useParams();
  const history = useHistory();
  const [sourceList, setSourceList] = useState([]);
  const [targetList, setTargetList] = useState([]);

  const inject = useInject();
  console.log(inject);

  const [progress, setProgress] = useState(null);
  const tradeToasterKeyRef = useRef(null);

  const renderProgress = useCallback((amount) => {
    return {
      icon: "cloud-upload",
      message: (
        <ProgressBar
          className={amount >= 100 && Classes.PROGRESS_NO_STRIPES}
          intent={amount < 100 ? "primary" : "success"}
          value={amount / 100}
        />
      ),
      onDismiss: () => {
        history.go(0);
      },
      timeout: amount < 100 ? 0 : 1000,
    }
  }, [history]);

  const onClickExchange = useCallback(async () => {
    const inc = 100 / (sourceList.length + targetList.length);
    await setProgress(0);
    for (let id of sourceList) {
      await client["students"].patch(id, {
        "class_id": params.id
      });
      await setProgress(progress => progress + inc);
    }
    for (let id of targetList) {
      await client["students"].patch(id, {
        "class_id": null
      });
      await setProgress(progress => progress + inc);
    }
    await setProgress(null);
  }, [client, params.id, sourceList, targetList]);

  useEffect(() => {
    if (progress === null) return;
    if (tradeToasterKeyRef.current === null) {
      tradeToasterKeyRef.current = TradeToaster.show(renderProgress(progress));
    } else {
      TradeToaster.show(renderProgress(progress), tradeToasterKeyRef.current);
    }
  }, [progress, renderProgress]);

  return (
    <TradeProvider
      value={{
        lock: progress !== null,

        sourceList,
        setSourceList,

        targetList,
        setTargetList,
      }}
    >
      <Flex
        sx={{
          mx: -2,
          "> div": {
            mx: 2
          }
        }}
      >
        <Box sx={{ flexGrow: 1, width: "50%" }}>
          <ListProvider
            onSelectionChange={(selected) => {
              setTargetList(selected);
            }}
            filter={{
              "class_id": params.id,
              "generation": null,
            }}
          >
            <MahasiswaTradeTarget />
          </ListProvider>
        </Box>
        <Flex sx={{ flexShrink: 1, alignItems: "flex-start" }}>
          <Box sx={{
            position: "sticky",
            top: "25vh",
            py: 3,
          }}>
            <Tooltip2 content={"Trade"} placement="bottom">
              <Button
                disabled={!(sourceList.length > 0 || targetList.length > 0)}
                title="Menukarkan"
                icon="exchange"
                onClick={() => onClickExchange()}
              />
            </Tooltip2>
          </Box>
        </Flex>
        <Box sx={{ flexGrow: 1, width: "50%" }}>
          <ListProvider
            onSelectionChange={(selected) => {
              setSourceList(selected);
            }}
            filter={{
              "class_id": params.id,
              "generation": null,
              "study_program_id": _get(inject.state, "study_program_id")
            }}
          >
            <MahasiswaTradeSource />
          </ListProvider>
        </Box>
      </Flex>
    </TradeProvider>
  )
}

export default MahasiswaTrade;