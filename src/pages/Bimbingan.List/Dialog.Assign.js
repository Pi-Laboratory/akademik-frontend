import { Button, Classes, Dialog, FormGroup, Spinner } from "@blueprintjs/core";
import { ListGroup, useClient, Box, Flex } from "components";
import { FetchAndSelect } from "components/FetchAndSelect";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  "lecturer_id": Yup.string().required(),
})

export const DialogAssign = ({
  isOpen,
  data,
  onClose = () => { },
  onSubmitted = () => { }
}) => {
  const client = useClient();
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    if (data.length === 0) return;
    const fetch = async () => {
      try {
        let res = await client["students"].find({
          query: {
            $select: ["id", "name", "nim", "current_semester"],
            $limit: 3,
            id: { $in: data },
            $include: [{
              model: "study_programs",
              $select: ["id", "name"],
              $include: [{
                model: "majors",
                $select: ["id", "name"]
              }]
            }]
          }
        });
        setItems(res.data)
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [data, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog
      enforceFocus={false}
      isOpen={isOpen}
      onClose={() => { onClose() }}
      title="Assign pembimbing"
    >
      <Formik
        validationSchema={Schema}
        initialValues={{
          "lecturer_id": ""
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          let result = data.map((student_id) => ({
            "lecturer_id": values["lecturer_id"],
            "student_id": student_id,
            "achievements": []
          }));
          try {
            const res = await client["preceptors"].create(result);
            onClose();
            onSubmitted(res);
          } catch (err) {
            console.error(err);
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue }) =>
          <form onSubmit={handleSubmit}>
            <div className={Classes.DIALOG_BODY}>
              <h4>Mahasiswa yang dipilih:</h4>
              <Box sx={{
                mb: 3
              }}>
                <ListGroup>
                  {items === null && (
                    <Box sx={{ p: 2 }}>
                      <Spinner />
                    </Box>
                  )}

                  {items && items.map((item) => (
                    <ListGroup.Item key={item["id"]}>
                      <Flex sx={{
                        "> div": {
                          width: `${100 / 3}%`
                        }
                      }}>
                        <Box>
                          <Box>
                            {item["name"]}
                          </Box>
                          <Box sx={{ color: "gray.5" }}>
                            {item["nim"]}
                          </Box>
                        </Box>
                        <Box>
                          <Box sx={{ color: "gray.5" }}>
                            Semester
                          </Box>
                          <Box>
                            {item["current_semester"]}
                          </Box>
                        </Box>
                        <Box>
                          <Box>
                            {item["study_program"]["name"]}
                          </Box>
                          <Box sx={{ color: "gray.5" }}>
                            {item["study_program"]["major"]["name"]}
                          </Box>
                        </Box>
                      </Flex>
                    </ListGroup.Item>))}
                  {items && data.length > 3 &&
                    <ListGroup.Item>
                      <Flex sx={{
                        justifyContent: "center"
                      }}>
                        <Box>{data.length - 3} more student</Box>
                      </Flex>
                    </ListGroup.Item>}
                </ListGroup>

              </Box>
              <FormGroup
                label="Dosen"
                labelFor="f-lecturer_id"
                helperText={errors["lecturer_id"]}
                intent={errors["lecturer_id"] ? "danger" : "none"}
              >
                <FetchAndSelect
                  service={client["lecturers"]}
                  id="f-lecturer_id"
                  name="lecturer_id"
                  placeholder="Lecturer"
                  value={String(values["lecturer_id"])}
                  intent={errors["lecturer_id"] ? "danger" : "none"}
                  onChange={async ({ value }) => {
                    await setFieldValue("lecturer_id", value);
                  }}
                  onPreFetch={(q, query) => {
                    return {
                      ...query,
                      $select: ["id", "nidn"],
                      $include: [{
                        model: "employees",
                        $select: ["name", "nip"],
                        $sort: {
                          name: 1
                        },
                        $where: q ? {
                          $or: [{
                            name: { $iLike: `%${q}%` }
                          }, {
                            nip: { $iLike: `%${q}%` }
                          }]
                        } : undefined
                      }]
                    }
                  }}
                  onFetched={(items) =>
                    items.map(({ id, employee }) => {
                      return ({
                        label: employee.name,
                        value: id,
                        info: employee.nip
                      })
                    })}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button
                  minimal={true}
                  intent="danger"
                  text="Close"
                  onClick={() => {
                    onClose();
                  }}
                />
                <Button loading={isSubmitting} type="submit" intent="primary" text="Simpan" />
              </div>
            </div>
          </form>
        }
      </Formik>
    </Dialog>
  )
}
