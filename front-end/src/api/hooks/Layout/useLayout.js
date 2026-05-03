// import { useState, useEffect } from "react";
// import { EmployeesServices } from "../../services/EmployeeServices";
// import useLogout from "../Auth/useLogout";

// export function useLayout() {

//   const email = localStorage.getItem("email");
//   const [data, setData] = useState(null);
//   const { logout, loading } = useLogout();

//   useEffect(() => {

//     const fetchUser = async () => {
//       try {
//         if (!email) return;

//         const response = await EmployeesServices.EmployeesGetByEmail(email);
        
//         setData(response);

//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();

//   }, [email]);

//   return { data, logout, loading };
// }


import { useState, useEffect } from "react";
import { EmployeesServices } from "../../services/EmployeeServices";
import useLogout from "../Auth/useLogout";

export function useLayout() {

  const email = localStorage.getItem("email");

  const [data, setData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const { logout, loading } = useLogout();

  useEffect(() => {

    const fetchUser = async () => {
      try {
        if (!email) {
          setLoadingUser(false);
          return;
        }

        setLoadingUser(true);

        const response = await EmployeesServices.EmployeesGetByEmail(email);

        setData(response);

      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();

  }, [email]);

  return { data, logout, loading, loadingUser };
}