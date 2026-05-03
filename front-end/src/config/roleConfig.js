import AdminDashboard from "../page/dashboard/AdminDashboard"
import EmployeeDashboard from "../page/dashboard/EmployeeDashboard"
import ManagerDashboard from "../page/dashboard/ManagerDashboard"

export const roleDashboard = {
  admin: AdminDashboard,
  manager: ManagerDashboard,
  guest: EmployeeDashboard,
}