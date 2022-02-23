import { Button, Classes, InputGroup, NonIdealState } from "@blueprintjs/core"
import { Box, Divider, Flex, useClient } from "components"
import { useCallback, useEffect, useState } from "react"

export const Achievements = ({ studyProgramId, preceptorId, list }) => {
  const client = useClient();

  const [isSubmitting, setSubmitting] = useState(false);
  const [achievements, setAchievements] = useState(list || []);
  const [available, setAvailable] = useState([]);

  const save = useCallback(async () => {
    setSubmitting(true);
    try {
      await client["preceptors"].patch(preceptorId, {
        achievements
      });
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  }, [client, preceptorId, achievements]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["study-programs"].get(studyProgramId);
        setAvailable(res["achievements"]);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client, studyProgramId]);

  return (
    <>
      <Flex sx={{ mt: 4, width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <h4 className={Classes.HEADING}>Achievements</h4>
        </Box>
        <Box>
          <Button
            loading={isSubmitting}
            small={true}
            outlined={true}
            text="Save"
            onClick={() => save()}
          />
        </Box>
      </Flex>
      <Flex sx={{ mx: -2 }}>
        <Box sx={{ width: "65%", mx: 2 }}>
          {!(achievements.length > 0) &&
            <NonIdealState
              title="No Achievement"
            />}
          {achievements.map((x, i) => {
            return (
              <Flex key={x["key"]}>
                <Flex sx={{
                  flexGrow: 1,
                  mb: 2,
                  width: "50%"
                }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <InputGroup
                      fill={true}
                      value={x["name"]}
                      readOnly={true}
                    />
                  </Box>
                  <Box sx={{ width: "25%" }}>
                    <InputGroup
                      fill={true}
                      value={x["score"]}
                      onChange={(e) => {
                        setAchievements(a => {
                          return [...a.map((b) => {
                            if (b["key"] === x["key"]) b["score"] = e.target.value;
                            return b;
                          })];
                        })
                      }}
                    />
                  </Box>
                </Flex>
                <Box>
                  <Button
                    minimal={true}
                    intent="danger"
                    icon="cross"
                    onClick={() => {
                      setAchievements(a => {
                        let b = [...a];
                        b.splice(i, 1)
                        return b;
                      });
                    }}
                  />
                </Box>
              </Flex>
            )
          })}
        </Box>
        <Divider />
        <Box sx={{ width: "35%", mx: 2 }}>
          {available.map((x, i) => {
            const isAchive = achievements.find((a) => a["key"] === x["key"]);
            return (
              <Flex key={x["key"]}>
                <Box sx={{
                  flexGrow: 1,
                  mb: 2,
                  width: "50%"
                }}>
                  <InputGroup
                    fill={true}
                    value={x["name"]}
                    readOnly={true}
                  />

                </Box>
                <Box>
                  <Button
                    minimal={true}
                    intent={isAchive ? "success" : "none"}
                    icon={isAchive ? "tick" : "plus"}
                    onClick={() => {
                      if (!isAchive) {
                        setAchievements(a => {
                          let b = [...a, x];
                          return b;
                        });
                      } else {
                        setAchievements(a => {
                          let b = [...a];
                          const idx = b.findIndex(c => c["key"] === x["key"]);
                          b.splice(idx, 1);
                          return b;
                        });
                      }
                    }}
                  />
                </Box>
              </Flex>
            )
          })}
        </Box>
      </Flex>
    </>
  )
}