import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

/* Dashboard Pages */
import DashboardHome from "./page/dashboard/Analytics";
import DashboardLayout from "./page/layout/DashboardLayout";

/* Authentication Pages */
import Register from "./page/auth/Register";
import Login from "./page/auth/Login";

/* Authentication Changes Pages */
import ResetPassword from "./page/auth_modification/ResetPassword";
import ChangePassword from "./page/auth_modification/ChangePassword";
import VerifyOTP from "./page/auth_modification/VerifyOTP";

/* Employee Pages */
import EmployeeProfile from "./page/employee/EmployeeProfile";
import EmployeesList from "./page/employee/EmployeeList";
import EmployeeEdit from "./page/employee/EmployeeEdit";
import EmployeeProfileView from "./page/employee/EmployeeProfileView";

/* Project Pages */
import ProjectRegister from "./page/project/ProjectRegister";
import ProjectsList from "./page/project/ProjectsLists";
import ProjectDetails from "./page/project/ProjectDetails";
import ProjectEdit from "./page/project/ProjectEdit";
import EmployeePerformanceReport from "./page/Report/Report"
import TeamReport from "./page/Report/TeamReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee/reset-password" element={<ResetPassword />} />
        <Route path="/employee/change-password" element={<ChangePassword />} />
        <Route path="/employee/otp-verify" element={<VerifyOTP />} />
       

        {/* ================= PROTECTED ROUTES ================= */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>

            <Route index element={<DashboardHome />} />
             <Route path="employee/performance-report" element={<EmployeePerformanceReport />} />
             <Route path="/dashboard/teams-report" element={<TeamReport />} />


            {/* ================= EMPLOYEE ================= */}

            <Route path="employees-list" element={<EmployeesList />} />
            <Route path="employee-profile" element={<EmployeeProfile />} />

            {/* ADMIN ONLY */}

            {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}> */}
              <Route path="employee/register" element={<Register />} />
              <Route path="employee/edit/:email" element={<EmployeeEdit />} />
              <Route path="/dashboard/employee/view/:email" element={<EmployeeProfileView />} />
            {/* </Route> */}

            {/* ================= PROJECT ================= */}

           
            <Route path="projects-list" element={<ProjectsList />} />

            <Route path="project/:" element={<ProjectDetails />} /> 


            {/* ADMIN + MANAGER */}

            {/* <Route element={<ProtectedRoute allowedRoles={["admin","manager"]} />}> */}
              <Route path="project/register" element={<ProjectRegister />} />
              <Route path="project/edit/:id" element={<ProjectEdit />} />
            {/* </Route> */}

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;