import { Button, Classes, NonIdealState } from "@blueprintjs/core";
import { AspectRatio, Box, Flex } from "components";
import IDCardBG from "assets/imgs/idcard_bg.png";

export const DialogIDCard = ({ onClose, data }) => {
  return (
    <>
      <div className={Classes.DIALOG_BODY}>
        <Box
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
                      src={data["photo"]}
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
                  <Box>{data["name"]}</Box>
                  <Box>{data["study_program"]["name"]}</Box>
                  <Box>{data["study_program"]["major"]["name"]}</Box>
                  <Box>{data["nim"]}</Box>
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
          <Button intent="primary" text="Save" />
        </div>
      </div>
    </>
  );
}