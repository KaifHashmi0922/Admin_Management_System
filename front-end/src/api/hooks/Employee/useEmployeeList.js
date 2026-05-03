import { useEffect, useState } from "react";
import { EmployeesServices } from "../../services/EmployeeServices";

export function useEmployeesList() {
  const [employees, setEmployees] = useState([]);

    const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = employees.filter(emp =>
    emp.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => { setCurrentPage(1) }, [searchTerm])
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1)
  }, [filteredEmployees.length, totalPages, currentPage])

const toggleLoginStatus = async (email) => {
  // Optimistic update first
  // setEmployees(prev => prev.map(emp => 
  //   emp.email === email ? { ...emp, is_logged: true } : emp
  // ));

  try {
    const resp = await EmployeesServices.EmployeeLogout(email);
    alert("logut")
    // Success: state already updated ✅
  } catch (error) {
    console.error('Logout failed, reverting...');
    // Rollback
    setEmployees(prev => prev.map(emp => 
      emp.email === email ? { ...emp, is_logged: false } : emp
    ));
  }
};


  const toggleActiveStatus = (email) => {
    setEmployees(prev => prev.map(emp => 
      emp.email === email ? { ...emp, active: !emp.active } : emp
    ))
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await EmployeesServices.EmployeesList();
      // console.log(data);
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  // console.log(employees,"=");



  return { employees ,fetchEmployees
    ,toggleActiveStatus,toggleLoginStatus,
    filteredEmployees,
    searchTerm,
    
  };
}