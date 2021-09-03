import { Box } from "components";
import { useState } from "react";
import _debounce from "lodash/debounce";
import { useDropzone } from "react-dropzone";
import { Button, Text } from "@blueprintjs/core";

export const ImageDropzone = ({
  sx,
  file = {
    id: null,
    url: null
  },
  disabled,
  onDelete = () => { },
  onUploaded = () => { }
}) => {
  const [loading, setLoading] = useState(false);
  const upload = _debounce((files) => {
    let file = files[0];
    if (!file) return;
    console.log(file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    disabled: disabled,
    onDropAccepted: (files) => {
      setLoading(true);
      upload(files);
    },
    onDropRejected: (files) => {
      console.log("rejected file:", files);
    },
    accept: "image/jpeg, image/png, image/gif",
    maxSize: 5e+5,
    multiple: false,
  });
  return (
    <Box
      sx={{
        ...sx
      }}
      {...getRootProps({ refKey: "ref", className: `${disabled && "disabled"}` })}
    >
      <input {...getInputProps()} />
      {loading && <Text textAlign="center">Loading...</Text>}
      <Box>
        <Button
          small={true}
          icon="trash"
        />
      </Box>
    </Box>
  )
}