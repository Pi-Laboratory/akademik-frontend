import moment from "moment";
import { Card, Classes, H6, NonIdealState } from "@blueprintjs/core";
import { Box, Divider, Flex, useClient } from "components";
import { Fragment, useEffect, useState } from "react/cjs/react.development";

const Main = () => {
  const client = useClient();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      console.log(client["account"]);
      try {
        const res = await client["notifications"].find({
          query: {
            to_id: client["account"]["id"],
            $select: ["id", "intent", "title", "message", "created_at"]
          }
        });
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [client]);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Card>
          <Flex sx={{ mb: 3, alignItems: "center" }}>
            <Box as="h4" className={`${Classes.HEADING}`} sx={{ m: 0 }}>Pengumuman</Box>
            <Box sx={{ flexGrow: 1 }} />
          </Flex>
          {items.map(({ id, title, message, created_at }, idx) => (
            <Fragment key={id}>
              <Flex sx={{ alignItems: "baseline" }}>
                <H6>{title}</H6>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ fontSize: 0 }}>{moment(created_at).calendar()}</Box>
              </Flex>
              <Box as="p">
                {message}
              </Box>
              {idx < (items.length - 1) &&
                <Divider />}
            </Fragment>
          ))}
          {items.length === 0 &&
            <NonIdealState
              title="Tidak ada pengumuman"
            />}
        </Card>
      </Box>
    </Box>
  );
}

export default Main;