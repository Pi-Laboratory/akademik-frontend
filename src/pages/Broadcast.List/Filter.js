import { Button, ButtonGroup } from "@blueprintjs/core";
import { Box, Flex, useClient, useList } from "components";
import { FetchAndSelect } from "components/FetchAndSelect";
import { filterField } from ".";

const Filter = () => {
  const client = useClient();

  const { filter, setFilter } = useList();

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
                    setFilter(f => ({ ...f, role: value }), true)
                  }}
                />
              )
            })}
          </ButtonGroup>
        </Box>
        <Box sx={{ ml: 2 }}>
          <FetchAndSelect
            service={client["study-programs"]}
            id="f-study_program_id"
            name="study_program_id"
            minimal={true}
            placeholder="Program Studi"
            value={filter["study_program_id"]}
            onChange={({ value }) => {
              setFilter(filter => ({ ...filter, "study_program_id": value }), true)
            }}
            onPreFetch={(q, query) => {
              return {
                ...query,
                "name": q ? {
                  $iLike: `%${q}%`
                } : undefined,
                $select: ["id", "name"],
                $include: [{
                  model: "majors",
                  $select: ["id", "name"]
                }]
              }
            }}
            onFetched={(items) => {
              return items.map((item) => {
                return {
                  label: item["name"],
                  value: `${item["id"]}`,
                  info: item["major"]["name"]
                }
              })
            }}
          />
        </Box>
        <Box sx={{ ml: 2 }}>
          {filterField.map(f => !!filter[f]).indexOf(true) !== -1
            && <Button
              title="Clear Filter"
              minimal={true}
              intent="warning"
              icon="filter-remove"
              onClick={() => {
                const ff = {};
                filterField.forEach(f => ff[f] = undefined);
                setFilter(filter => ({
                  ...filter,
                  ...ff
                }), true);
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