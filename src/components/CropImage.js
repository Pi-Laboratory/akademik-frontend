import { Button, Classes, Dialog } from "@blueprintjs/core";
import { AspectRatio, Box } from "components";
import { useRef, useEffect, useState } from "react";
import Cropper from "cropperjs";

export const getBase64 = file => new Promise((resolve, reject) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export const CropImageArea = ({ src, ratio = 1 / 1, onCropped, onClose = () => { } }) => {
  const imageRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (imageRef.current === null) return;
    const cropper = new Cropper(imageRef.current, {
      aspectRatio: ratio,
      background: false,
      cropend() {
        const canvas = cropper.getCroppedCanvas();
        setCroppedImage(canvas.toDataURL());
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box sx={{
        "#image-crop-area": {
          display: "block",
          maxWidth: "100%"
        }
      }}>
        <AspectRatio ratio="1:1">
          <img
            id="image-crop-area"
            ref={imageRef}
            src={src}
            alt="Crop Area"
          />
        </AspectRatio>
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
              onClose();
            }}
          />
          <Button
            disabled={croppedImage === null}
            intent="primary"
            text="Crop"
            onClick={() => {
              onCropped(croppedImage);
              onClose();
            }}
          />
        </div>
      </Box>
    </>
  )
}

export const CropImage = ({
  ButtonComponent = Button,
  buttonProps = {},
  ratio,
  src,
  onCropped,
  disabled,
  text,
  icon = "mugshot",
  title = "Crop Image",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ButtonComponent
        disabled={disabled}
        icon={icon}
        text={text}
        title={title}
        onClick={() => setIsOpen(s => !s)}
        {...buttonProps}
      />
      <Dialog
        enforceFocus={false}
        isOpen={isOpen}
        style={{
          overflow: "hidden"
        }}
      >
        <CropImageArea
          ratio={ratio}
          src={src}
          onCropped={onCropped}
          onClose={() => setIsOpen(false)}
        />
      </Dialog>
    </>
  )
}