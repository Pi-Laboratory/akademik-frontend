import { Button, Classes, Dialog } from "@blueprintjs/core";
import { Box } from "components";
import { useCallback, useRef, useEffect, useState, useMemo } from "react";

export const TakePhotoArea = ({ onCapture = () => { }, onClose = () => { } }) => {
  const videoArea = useRef();
  const canvasArea = useRef();

  const cleanup = useCallback(async () => {
    const tracks = videoArea.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
  }, [videoArea]);

  const askForPermission = useCallback(async () => {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    } catch (err) {
      alert(err.message);
      return;
    }
    videoArea.current.srcObject = stream;
    videoArea.current.classList.add("allowed");

    return () => {
      cleanup();
    }
  }, []);

  const captureImage = useCallback(() => {
    const video = videoArea.current;
    const canvas = canvasArea.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL('image/jpeg');
    onCapture(data);
    return data;
  }, []);

  useEffect(() => {
    askForPermission();
  }, []);

  return (
    <>
      <Box sx={{
        "#camera-raw": {
          width: "100%",
          display: "block"
        },
        "#camera-capture-canvas": {
          display: "none"
        }
      }}>
        <video id="camera-raw" ref={videoArea} autoPlay={true} muted={true} />
        <canvas id="camera-capture-canvas" ref={canvasArea} />
      </Box>
      <Box
        className={Classes.DIALOG_FOOTER}
        sx={{
          mt: 3,
          px: 3
        }}
      >
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            minimal={true}
            text="Close"
            onClick={() => {
              cleanup();
              onClose();
            }}
          />
          <Button
            intent="primary"
            text="Capture"
            onClick={() => {
              captureImage();
              cleanup();
              onClose();
            }}
          />
        </div>
      </Box>
    </>
  )
}

export const TakePhoto = ({ onCapture, icon = "camera", text, title = "Take Picture" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCompatible = useMemo(() => {
    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  })
  return (isCompatible && (
    <>
      <Button
        icon={icon}
        text={text}
        title={title}
        onClick={() => setIsOpen(s => !s)}
      />
      <Dialog
        enforceFocus={false}
        isOpen={isOpen}
        style={{
          overflow: "hidden"
        }}
      >
        <TakePhotoArea
          onCapture={onCapture}
          onClose={() => setIsOpen(false)}
        />
      </Dialog>
    </>
  ))
}