import { useState } from "react";
import EmployeeServices from "../../services/EmployeeServices";

function useEmployeeQuery() {

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const searchEmployee = async (query) => {
    try {
      setLoading(true);

      const { data } = await EmployeeServices.EmployeeQuery(query);
      console.log(data);

      setEmployees(data);

    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return { employees, loading, searchEmployee };
}

export default useEmployeeQuery;