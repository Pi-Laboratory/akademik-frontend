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
    const account = client["account"];
    console.log(account);
    const fetch = async () => {
      try {
        const res = await client["lecturers"].get(account["lecturer_id"], {
          query: {
            $include: [{
              model: "employees"
            }]
          }
        });
        const employee = res["employee"];
        delete res["employee"];
        employee.lecturer = res;
        employee.address = joinPropsString(employee, [
          "province.name",
          "city.name",
          "district.name",
          "subdistrict.name",
          "neighbor.name",
          "home_address",
        ], ", ");
        setData(employee);
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