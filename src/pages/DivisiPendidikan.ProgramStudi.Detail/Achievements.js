import { Button, Classes, InputGroup } from "@blueprintjs/core"
import { Box, Flex, useClient } from "components"
import { useCallback, useState } from "react"

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const Achievements = ({ data }) => {
  const client = useClient();

  const [isSubmitting, setSubmitting] = useState(false);
  const [achievements, setAchievements] = useState(data["achievements"] !== null ? [...data["achievements"], { key: ID(), name: "" }] : [{ key: ID(), name: "" }]);

  const save = useCallback(async () => {
    setSubmitting(true);
    let result = [...achievements];
    result.splice(achievements.length - 1, 1);
    try {
      await client["study-programs"].patch(data["id"], {
        achievements: result
      });
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  }, [client, data, achievements]);

  return (
    <>
      <Flex sx={{ mt: 4, width: "50%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <h4 className={Classes.HEADING}>Achievements</h4>
        </Box>
        <Box>
          <Button
            loading={isSubmitting}
            small={true}
            minimal={true}
            text="Save"
            onClick={() => save()}
          />
        </Box>
      </Flex>
      {achievements &&
        <Box>
          {achievements.map((x, i) => {
            return (
              <Flex key={x["key"]}>
                <Box sx={{
                  mb: 2,
                }}>
                  <InputGroup
                    placeholder={(i >= achievements.length - 1) ? "Type to create new..." : "name"}
                    value={x["name"]}
                    onChange={(e) => {
                      setAchievements(a => {
                        return a.map((b, ii) => {
                          if (i === ii) b.name = e.target.value;
                          return b;
                        });
                      });
                      if (i >= achievements.length - 1) {
                        setAchievements(a => {
                          return [...a, { key: ID(), name: "" }];
                        });
                      }
                    }}
                  />
                </Box>
                {!(i >= achievements.length - 1) &&
                  <Box>
                    <Button
                      disabled={achievements.length === 1}
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
                  </Box>}
              </Flex>
            )
          })}
        </Box>}
    </>
  )
}