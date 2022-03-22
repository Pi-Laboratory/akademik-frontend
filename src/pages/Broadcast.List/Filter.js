import { Button, ButtonGroup } from "@blueprintjs/core";
import { Box, Flex, Select, useClient, useList } from "components";
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

const Filter = () => {
  const client = useClient();

  const { filter, setFilter } = useList();

  const history = useHistory();
  const [loading, setLoading] = useState({
    "studyPrograms": false,
  });
  const [studyPrograms, setStudyPrograms] = useState([]);

  const fetchStudyPrograms = useCallback(async (query) => {
    setLoading(l => ({ ...l, studyPrograms: true }));
    try {
      const res = (await client["study-programs"].find({
        query: {
          $limit: 25,
          $select: ["id", "name"],
          $include: [{
            model: "majors",
            $select: ["id", "name"]
          }]
        }
      })).data.map((d) => ({
        label: d["name"],
        value: d["id"],
        info: d["major"]["name"]
      }));
      setStudyPrograms(res);
    } catch (err) {
      console.error(err.message);
    }
    setLoading(l => ({ ...l, studyPrograms: false }));
  }, [client]);

  return (
    <Flex
      sx={{
        mb: 3,
        mr: -3,
        "> div": {
          mr: 3
        }
      }}
    >
      <Flex>
        <Box>
          <ButtonGroup>
            {[{
              text: "Admin",
              value: "admin"
            }, {
              text: "Dosen",
              value: "lecturer"
            }, {
              text: "Student",
              value: "student"
            }, {
              text: "Public",
              value: "public"
            },].map(({ value, intent = "primary", text, ...props }) => {
              const isActive = value === filter.role;
              return (
                <Button
                  {...props}
                  key={text}
                  intent={isActive ? intent : "none"}
                  active={isActive}
                  text={text}
                  onClick={() => {
                    if (isActive) return
                    setFilter(f => ({ ...f, role: value }))
                  }}
                />
              )
            })}
          </ButtonGroup>
        </Box>
        <Box sx={{ ml: 2 }}>
          <Select
            fill={true}
            id={`f-study_program_id`}
            name={`study_program_id`}
            loading={loading["studyPrograms"]}
            placeholder="Program Studi"
            value={filter[`study_program_id`]}
            onChange={({ value }) => {
              setFilter(f => ({ ...f, "study_program_id": value }));
            }}
            onQueryChange={(value) => {
              fetchStudyPrograms(value);
            }}
            options={studyPrograms}
            onOpening={() => {
              fetchStudyPrograms("");
            }}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          {[
            !!filter["role"],
            !!filter["study_program_id"],
          ].indexOf(true) !== -1
            && <Button
              minimal={true}
              intent="warning"
              icon="filter-remove"
              onClick={() => {
                history.replace({
                  search: ""
                });
                setFilter(filter => ({
                  ...filter,
                  "role": null,
                  "study_program_id": null
                }))
              }}
            />}
        </Box>
      </Flex>
      <Box sx={{ flexGrow: 1 }} />
      <Flex>

      </Flex>
    </Flex>
  )
}

export default Filter;