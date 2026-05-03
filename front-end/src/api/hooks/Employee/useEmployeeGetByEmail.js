
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { EmployeeServices } from "../../services/EmployeeServices";


export function EmployeeData() {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState("");

    useEffect(() => {
        getEmpData();
    }, []);

    const getEmpData = async () => {
        try {
            const email=localStorage.getItem("email")
           
            const response = await EmployeeServices.EmployeeGet(email);
         
            setEmployeeData(response.data);
    
            console.log(response.data);
            console.log(employeeData?.fullname);
            
            
        }   
        catch (err) {



            console.error("Employee Data Error:", err);

            if (err.response?.status === 401) {
                localStorage.removeItem("access_token");
                navigate("/login");
            }       
        }
    };      

  return (
    {employeeData,setEmployeeData}
    
  )
}




