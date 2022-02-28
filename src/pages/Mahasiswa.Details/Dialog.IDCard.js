import { useRef, useCallback } from "react";
import { Button, Classes, NonIdealState } from "@blueprintjs/core";
import { toPng } from "html-to-image";
import { AspectRatio, Box, Flex, toaster } from "components";
import IDCardBG from "assets/imgs/idcard_bg.png";

export const DialogIDCard = ({ onClose, data }) => {
  const canvasRef = useRef(null);

  const saveIDCard = useCallback(() => {
    const el = canvasRef.current;
    const tp = toaster.show({
      icon: "time",
      intent: "info",
      message: "Menyiapkan gambar",
    });

    toPng(el, {
      canvasHeight: 1625,
      canvasWidth: 1024,
    }).then((dataUrl) => {
      let anchorDownload = document.createElement("a");
      anchorDownload.download = `${data["nim"]}.png`;
      anchorDownload.href = dataUrl;
      anchorDownload.click();
      toaster.dismiss(tp);
      toaster.show({
        icon: "tick",
        intent: "success",
        message: "Gambar disimpan",
      });
    });
  }, [data]);

  return (
    <>
      <div className={Classes.DIALOG_BODY}>
        <Box
          ref={canvasRef}
          sx={{
            borderRadius: 8,
            backgroundImage: `url(${IDCardBG})`,
            backgroundSize: "100%",
          }}
        >
          <AspectRatio ratio="638:1011">
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 76
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 8,
                  border: "2px solid white",
                  mt: "225px",
                  mx: "auto",
                  width: "232px",
                  height: "293px",
                  overflow: "hidden",
                  position: "relative"
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "white",
                    opacity: 0.5
                  }}
                />
                <Box sx={{ position: "absolute", inset: 0 }}>
                  {data["photo"] &&
                    <Box
                      as="img"
                      src={`data:image/jpg;base64,${data["photo"]}`}
                      sx={{
                        display: "block",
                        width: "100%"
                      }}
                    />}
                  {!data["photo"] &&
                    <NonIdealState
                      icon="graph-remove"
                      title="No Photo"
                    />}
                </Box>
              </Box>
              <Flex
                sx={{
                  mt: 25,
                  width: 340,
                  height: 165,
                  mx: "auto",
                  fontSize: 28,
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  borderRadius: 8,
                  border: "2px solid white",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "white",
                    opacity: 0.5
                  }}
                />
                <Flex sx={{
                  flexDirection: "column",
                  position: "absolute",
                  inset: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  lineHeight: 1.25,
                }}>
                  <Box sx={{
                    maxWidth: "20ch",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    // textOverflow: "ellipsis"
                  }}>{data["name"]}</Box>
                  <Box sx={{ fontSize: 3, fontWeight: "bold", color: "gray.7" }}>{data["study_program"]["name"]}</Box>
                  <Box sx={{ fontSize: 3, fontWeight: "bold", color: "gray.7" }}>{data["study_program"]["major"]["name"]}</Box>
                  <Box sx={{ fontFamily: "monospace", my: 2 }}>{data["nim"]}</Box>
                </Flex>
              </Flex>
            </Box>
          </AspectRatio>
        </Box>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            intent="none"
            minimal={true}
            text="Tutup"
            onClick={() => { onClose(); }}
          />
          <Button
            intent="primary"
            text="Save"
            onClick={() => saveIDCard()}
          />
        </div>
      </div>
    </>
  );
}