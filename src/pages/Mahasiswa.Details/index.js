import { useClient } from "components";
import { Navigation } from "pages/Root/hoc";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, useRouteMatch } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./Profile";
import { Settings } from "./Settings";

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
              "nim",
              "name",
              "generation",
              "religion",
              "gender",
              "birth_date",
              "birth_city",
              "phone_number",
              "email",
              "generation",
              "registration_number",
              "registration_date",
              "street",
              "student_status",
              "study_program",
              
              ...["father", "mother", "trustee"].reduce((p, c) => ([
                ...p,
                `${c}_name`,
                `${c}_birth_date`,
                `${c}_death_date`,
                `${c}_occupation`,
                `${c}_status`,
                `${c}_education`,
                `${c}_recent_education`,
              ]), []),

              "province",
              "city",
              "district",
              "subdistrict",
              "neighbor",
              "postal_code",

              "province_id",
              "city_id",
              "district_id",
              "subdistrict_id",
              "neighbor_id",
            ],
            $include: [{
              model: "provinces",
              $select: ["id", "name"]
            }, {
              model: "cities",
              $select: ["id", "name"]
            }, {
              model: "districts",
              $select: ["id", "name"]
            }, {
              model: "subdistricts",
              $select: ["id", "name"]
            }, {
              model: "neighbors",
              $select: ["id", "name"]
            }, {
              model: "study_programs",
              $select: [
                "id",
                "name",
              ],
              $include: [{
                model: "majors",
                $select: [
                  "id",
                  "name",
                ],
              }]
            }]
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
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": Profile,
      "path": `/`,
      "exact": true,
      "title": "Profile"
    },
    {
      "component": Settings,
      "path": `/settings`,
      "title": "Settings"
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Mahasiswa - Akademik</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <StudentProvider>
          <Layout />
        </StudentProvider>
      </Navigation>
    </>
  )
}

export default Detail;