import { useClient } from "components";
import { createContext, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const client = useClient();
  const params = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["students"].get(params["id"], {
          query: {
            $select: [
              "id",
              "name",
              "religion",
              "gender",
              "birth_date",
              "birth_city",
              "origin_address",
              "recent_address",
              "city",
              "postal_code",
              "phone_number",
              "email",
              "photo",
              "generation",
              "registration_number",
              "registration_date",
              "student_status",
              "study_program_id",
            ]
          }
        });
        setData(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <StudentContext.Provider value={data}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => {
  const student = useContext(StudentContext);
  return student;
}

const Detail = () => {

  return (
    <>
      <Helmet>
        <title>Dashboard - Mahasiswa - Akademik</title>
      </Helmet>
      <StudentProvider>
        <Layout />
      </StudentProvider>
    </>
  )
}

export default Detail;