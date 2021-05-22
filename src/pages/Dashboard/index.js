import moment from "moment";
import { Button, Card, Classes, H2, H4, H6 } from "@blueprintjs/core";
import { DatePicker, Classes as DateClasses } from "@blueprintjs/datetime";
import { Box, Divider, Flex } from "components";

const Dashboard = () => {
  return (
    <Flex sx={{ pt: 4, mr: 3, flexDirection: "column" }}>
      <Flex sx={{ alignItems: "baseline", ml: 3 }}>
        <Box>
          <Box as={H2}>Tahun Ajaran 2021/2022</Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button rightIcon="share" text="Website Resmi" />
        </Box>
      </Flex>
      <Divider />
      <Flex>
        <Box sx={{ mx: 3, flexGrow: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Card>
              <Flex sx={{ mb: 3, alignItems: "center" }}>
                <Box as="h4" className={`${Classes.HEADING}`} sx={{ m: 0 }}>Annoucment</Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                  <Button small={true} minimal={true} text="View All" />
                </Box>
              </Flex>
              <Flex sx={{ alignItems: "baseline" }}>
                <H6>Annoucment</H6>
                <Box sx={{ flexGrow: 1 }} />
                <Box>{moment().calendar()}</Box>
              </Flex>
              <Box as="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Box>
              <Divider />
              <Flex sx={{ alignItems: "baseline" }}>
                <H6>Annoucment</H6>
                <Box sx={{ flexGrow: 1 }} />
                <Box>{moment().calendar()}</Box>
              </Flex>
              <Box as="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Box>
            </Card>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Card>
              <Flex sx={{ mb: 3, alignItems: "center" }}>
                <Box as="h4" className={`${Classes.HEADING}`} sx={{ m: 0 }}>Annoucment</Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                  <Button small={true} minimal={true} text="View All" />
                </Box>
              </Flex>
              <Flex sx={{ alignItems: "baseline" }}>
                <H6>Annoucment</H6>
                <Box sx={{ flexGrow: 1 }} />
                <Box>{moment().calendar()}</Box>
              </Flex>
              <Box as="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Box>
              <Divider />
              <Flex sx={{ alignItems: "baseline" }}>
                <H6>Annoucment</H6>
                <Box sx={{ flexGrow: 1 }} />
                <Box>{moment().calendar()}</Box>
              </Flex>
              <Box as="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Box>
            </Card>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Card>
              <Flex sx={{ mb: 3, alignItems: "center" }}>
                <Box as="h4" className={`${Classes.HEADING}`} sx={{ m: 0 }}>Annoucment</Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                  <Button small={true} minimal={true} text="View All" />
                </Box>
              </Flex>
              <Flex sx={{ alignItems: "baseline" }}>
                <H6>Annoucment</H6>
                <Box sx={{ flexGrow: 1 }} />
                <Box>{moment().calendar()}</Box>
              </Flex>
              <Box as="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Box>
              <Divider />
              <Flex sx={{ alignItems: "baseline" }}>
                <H6>Annoucment</H6>
                <Box sx={{ flexGrow: 1 }} />
                <Box>{moment().calendar()}</Box>
              </Flex>
              <Box as="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Box>
            </Card>
          </Box>
        </Box>
        <Box sx={{ flexShrink: 0, width: 230 }}>
          <Box
            sx={{
              [`.${DateClasses.DATEPICKER}`]: {
                bg: "transparent"
              }
            }}
          >
            <DatePicker
              highlightCurrentDay={true}
            />
          </Box>
          <Card>
            Coba
          </Card>
        </Box>
      </Flex>
    </Flex >
  )
}

export default Dashboard;