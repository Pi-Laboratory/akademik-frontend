import { Layout } from './Layout'
import React, { useMemo } from 'react'
import Helmet from "react-helmet";
import { Navigation } from 'pages/Root/hoc'
import { useParams, useRouteMatch } from 'react-router'
import { Detail } from "./Detail";
import { Settings } from './Settings';
import { useClient } from 'components';
import { createContext, useContext, useEffect, useState } from 'react/cjs/react.development';

const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
  const client = useClient();
  const params = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const reg = client.account.registrations;
        const res = await client["registrations"].get(reg["id"], {
          query: {
            $include: [{
              model: "students",
              $select: [
                "id",
                "name",
                "gender",
                "birth_date",
                "birth_city",
                "province_id",
                "city_id",
                "district_id",
                "subdistrict_id",
                "neighbor_id",
                "street",
                "phone_number",
                "email",
              ],
              $include: [{
                model: "provinces",
                $select: ["id", "name"]
              },{
                model: "cities",
                $select: ["id", "name"]
              },{
                model: "districts",
                $select: ["id", "name"]
              },{
                model: "subdistricts",
                $select: ["id", "name"]
              },{
                model: "neighbors",
                $select: ["id", "name"]
              }]
            }, {
              model: "study_programs",
              as: "study_program_1",
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
            }, {
              model: "study_programs",
              as: "study_program_2",
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

export const PublicForm = () => {
  const { path } = useRouteMatch();
  const navigation = useMemo(() => ([
    {
      "component": Detail,
      "path": `/`,
      "hide": true,
      "exact": true,
      "title": "Profile"
    },
    {
      "component": Settings,
      "path": `/settings`,
      "hide": true,
      "exact": true,
      "title": "Settings"
    },
  ]), []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Mahasiswa</title>
      </Helmet>
      <Navigation base={path} navigation={navigation}>
        <StudentProvider>
          <Layout />
        </StudentProvider>
      </Navigation>
    </>
  )
}
