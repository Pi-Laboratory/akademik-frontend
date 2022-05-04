import { Button, Checkbox, Classes, NonIdealState, Spinner } from "@blueprintjs/core";
import { Box, Container, Flex, ListGroup, useClient, useList } from "components";
import { useDebounce } from "components/helper";
import { Pagination } from "components/Pagination";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DialogHapus from "./Dialog.Hapus";
import Item from "./Item";

const List = () => {
  const client = useClient();
  const { filter, items, setItems, status, paging, setPaging, selectedItem, dispatchSelectedItem } = useList();
  const [dialogOpen, setDialogOpen] = useState(null);
  const history = useHistory();

  const _f = useDebounce(filter, 200);

  useEffect(() => {
    const fetch = async () => {
      setItems(null);
      try {
        const query = {
          $limit: 25
          ,
          "username": _f["username"] ? {
            $iLike: `%${_f["username"]}%`
          } : undefined,
          $skip: paging.skip,
          $sort: {
            id: 1
          }
        };
        if (_f["role"] === "Dosen") {
          query["lecturer_id"] = { $ne: null }
        } else if (_f["role"] === "Mahasiswa") {
          query["student_id"] = { $ne: null };
        } else if (_f["role"] === "Public") {
          query["registration_id"] = { $ne: null };
        } else if (_f["role"] !== "") {
          query["lecturer_id"] = null;
          query["student_id"] = null;
          query["registration_id"] = null;
        }
        const res = await client["users"].find({ query });
        setItems(res.data.map((item) => {
          let role = "Admin";
          let url = "";
          if (item["lecturer_id"] !== null) {
            role = "Dosen";
            url = `/pengajar/${item["lecturer_id"]}`;
          }
          if (item["student_id"] !== null) {
            role = "Mahasiswa";
            url = `/mahasiswa/${item["student_id"]}`;
          }
          if (item["registration_id"] !== null) {
            role = "Public";
            url = `/penerimaan/${item["registration_id"]}`;
          }

          return {
            id: item["id"],
            username: item["username"],
            role: role,
            link: {
              label: "Detail",
              url
            },
            user: item
          }
        }));
        setPaging({
          total: res.total,
          limit: res.limit,
          skip: res.skip
        });
      } catch (err) {
        console.error(err);
        setItems([]);
      }
    }
    fetch();
  }, [client, _f, paging.skip, setItems, setPaging]);

  return (
    <Container sx={{ px: 3 }}>
      <ListGroup
        sx={{
          [`.${Classes.CHECKBOX}`]: {
            m: 0
          }
        }}
      >
        <ListGroup.Header>
          <Flex sx={{ alignItems: "center" }}>
            <Box>
              <Checkbox
                checked={status.checked}
                indeterminate={status.indeterminate}
                onChange={(e) => {
                  dispatchSelectedItem({
                    type: "all",
                    data: e.target.checked
                  })
                }}
              />
            </Box>
            {selectedItem.length > 0 &&
              <Box>
                <Button
                  minimal={true}
                  intent="danger"
                  text={`Delete ${selectedItem.length} selected`}
                  onClick={() => setDialogOpen("delete")}
                />
              </Box>
            }
            <DialogHapus
              data={selectedItem}
              isOpen={dialogOpen === "delete"}
              onClose={() => { setDialogOpen(null) }}
              onSubmitted={() => {
                history.go(0);
              }}
            />
          </Flex>
        </ListGroup.Header>
        {items === null &&
          <Box sx={{ p: 2 }}>
            <Spinner size={50} />
          </Box>
        }
        {items && items.length === 0 && (
          <Box sx={{ my: 3 }}>
            <NonIdealState
              title="No user available"
            />
          </Box>
        )}
        {items && items.map((item) => (
          <ListGroup.Item
            key={item["id"]}
            sx={{
              [`.action`]: {
                width: "30px",
                opacity: "0",
                pointerEvents: "none"
              },
              [`&:hover .action`]: {
                opacity: "1",
                pointerEvents: "unset"
              }
            }}
          >
            <Item data={item} />
          </ListGroup.Item>))}
      </ListGroup>
      <Pagination
        loading={items === null}
        total={paging.total}
        limit={paging.limit}
        skip={paging.skip}
        onClick={({ page, skip }) => {
          setPaging(paging => ({ ...paging, skip: skip }));
        }}
      />
    </Container >
  )
}

export default List;