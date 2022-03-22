import { Button, ButtonGroup, FormGroup, InputGroup } from "@blueprintjs/core";
import { Box, Flex, useClient, useList, toaster } from "components";
import { PREDIKAT } from "components/constants";
import { map as mappingValue } from "components/helper";
import { useCallback, useMemo, useState } from "react";
import { usePage } from "./hoc";

const Student = ({ weight, data: { "study": { student }, ...item } }) => {
  const client = useClient();
  const { selectedItem, dispatchSelectedItem } = useList();
  const page = usePage();

  const [score, setScore] = useState(() => {
    return {
      "presence": item["attendance_score"],
      "task": item["task_score"],
      "mid_test": item["mid_test_score"],
      "final_test": item["final_test_score"]
    }
  });

  const finalScore = useMemo(() => {
    if (page[0] === null) return {
      predicate: "",
      value: ""
    };
    const presence = ((page[0]["presence_weight"] * score["presence"])) || 0;
    const task = ((page[0]["task_weight"] * score["task"])) || 0;
    const midTest = ((page[0]["mid_test_weight"] * score["mid_test"])) || 0;
    const finalTest = ((page[0]["final_test_weight"] * score["final_test"])) || 0;
    let total = (presence + task + midTest + finalTest) / 100;
    let value = mappingValue(total, 0, 100, 0, 4);
    value = Math.round(value * 100) / 100;
    let predicate = "I";
    for (let x in PREDIKAT) {
      if (value >= PREDIKAT[x]) {
        predicate = x;
        break;
      }
    }
    return {
      predicate,
      value,
      total
    }
  }, [score, page]);

  const submitScore = useCallback(async (score) => {
    try {
      let toastKey = toaster.show({
        icon: "cloud-upload",
        message: `Menyimpan nilai`
      });
      await client["study-results"].patch(item["id"], {
        "attendance_score": score["presence"],
        "task_score": score["task"],
        "mid_test_score": score["mid_test"],
        "final_test_score": score["final_test"]
      });
      toaster.dismiss(toastKey);
      toaster.show({
        icon: "tick",
        intent: "success",
        message: `Nilai berhasil disimpan`
      });
    } catch (err) {
      console.error(err.message);
      toaster.show({
        intent: "danger",
        message: `Gagal menyimpan nilai`
      });
    }
  }, [client, item]);

  return (
    <>
      <Flex>
        <Box sx={{ flexShrink: 0, mr: 3, width: "25%" }}>
          <Box>
            {student["name"]}
          </Box>
          <Box sx={{ color: "gray.5" }}>
            {student["nim"]}
          </Box>
        </Box>
        {[
          ["Kehadiran", "presence"],
          ["Tugas", "task"],
          ["UTS", "mid_test"],
          ["UAS", "final_test"],
        ].map((v) =>
          <Box
            key={v[0]}
            sx={{
              flexGrow: 1,
              mr: 3,
              width: `${100 / 5}%`
            }}
          >
            <Box sx={{ color: "gray.5" }}>
              {v[0]}
            </Box>
            <Box sx={{
              "> div": {
                mb: 0
              }
            }}>
              <FormGroup>
                <InputGroup
                  min={0}
                  max={100}
                  value={Number(score[v[1]]) || ""}
                  size={3}
                  small={true}
                  type="text"
                  onChange={(e) => {
                    dispatchSelectedItem({
                      type: "toggle",
                      data: {
                        name: item["id"],
                        value: true
                      }
                    });
                    setScore((s) => ({ ...s, [`${v[1]}`]: e.target.value }));
                  }}
                />
              </FormGroup>
            </Box>
          </Box>)}
        <Box sx={{ flexGrow: 1, mr: 3, width: `${100 / 5}%` }}>
          <Box sx={{ color: "gray.5" }}>
            Predikat
          </Box>
          <Box sx={{
            "> div": {
              mb: 0
            }
          }}>
            {finalScore["total"]} | {finalScore["predicate"]}
          </Box>
        </Box>
        <Box sx={{ flexShrink: 0, width: "60px" }}>
          {selectedItem.indexOf(item["id"]) !== -1 &&
            <ButtonGroup minimal={true}>
              <Button
                icon="undo"
                onClick={() => {
                  dispatchSelectedItem({
                    type: "remove",
                    data: {
                      name: item["id"],
                    }
                  });
                  setScore(() => ({
                    "presence": item["presence_score"],
                    "task": item["task_score"],
                    "mid_test": item["mid_test_score"],
                    "final_test": item["final_test_score"]
                  }))
                }}
              />
              <Button
                icon="tick"
                onClick={() => {
                  dispatchSelectedItem({
                    type: "remove",
                    data: {
                      name: item["id"],
                    }
                  });
                  submitScore(score);
                }}
              />
            </ButtonGroup>}
        </Box>
      </Flex>
    </>
  )
}

export default Student;