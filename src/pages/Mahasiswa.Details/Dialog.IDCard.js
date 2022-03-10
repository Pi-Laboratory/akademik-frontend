import { useRef, useCallback, useEffect, useState } from "react";
import { Button, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { toPng } from "html-to-image";
import { AspectRatio, Box, Flex, toaster, useClient } from "components";
import IDCardBG from "assets/imgs/idcard_bg.png";
import QRCode from "qrcode";

export const DialogIDCard = ({ onClose, data }) => {
  const client = useClient();
  const canvasRef = useRef(null);
  const [qrcode, setQRCode] = useState(null);

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

  useEffect(() => {
    QRCode.toDataURL(data["nim"], { type: "png", margin: 2 }, (err, url) => {
      if (err) { return; }
      setQRCode(url);
    })
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
                  mt: "200px",
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
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "cover",
                    }}
                    as="img"
                    src={`${client.host.toString()}files/students/${data["id"]}/photo.jpg`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "https://via.placeholder.com/135x180?text=Tidak ditemukan";
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{
                borderRadius: 8,
                position: "absolute",
                top: 405,
                left: 22,
                height: 120,
                width: 120,
                backgroundColor: "white",
                overflow: "hidden"
              }}>
                {qrcode &&
                  <Box sx={{
                    height: "100%",
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundImage: `url(${qrcode})`
                  }} />}
                {!qrcode &&
                  <Spinner />}
              </Box>
              <Flex
                sx={{
                  mt: 50,
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