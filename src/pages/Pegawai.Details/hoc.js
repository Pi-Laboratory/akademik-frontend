import { useClient } from "components";
import { joinPropsString } from "components/helper";
import { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const client = useClient();
  const params = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await client["employees"].get(params["id"], {
          query: {
            // $select: [
            //   "id",
            //   "name",
            //   "religion",
            //   "gender",
            //   "birth_date",
            //   "birth_city",
            //   "origin_address",
            //   "recent_address",
            //   "city",
            //   "postal_code",
            //   "phone_number",
            //   "email",
            //   "generation",
            //   "registration_number",
            //   "registration_date",
            //   "student_status",
            //   "study_program_id",
            // ]
          }
        });
        res.address = joinPropsString(res, [
          "province.name",
          "city.name",
          "district.name",
          "subdistrict.name",
          "neighbor.name",
          "home_address",
        ], ", ");
        setData(res);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, [params["id"]]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <EmployeeContext.Provider value={data}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployee = () => {
  const student = useContext(EmployeeContext);
  return student;
}