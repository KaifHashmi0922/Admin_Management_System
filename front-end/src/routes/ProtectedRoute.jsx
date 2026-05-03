import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {

  const token = localStorage.getItem("access");
  const user = JSON.parse(localStorage.getItem("user"));

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Role check only if roles provided
  if (allowedRoles && allowedRoles.length > 0) {

    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }

  }

  return <Outlet />;
};

export default ProtectedRoute;




// import { Navigate, Outlet } from "react-router-dom";

// export default function ProtectedRoute({ allowedRoles }) {
//   // Get auth state from localStorage or your auth context
//   const isAuthenticated = localStorage.getItem("token"); 
//   const userRole = localStorage.getItem("role"); // "admin", "manager", "employee"

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check role-based access if allowedRoles is specified
//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // ✅ CRITICAL: Render child routes using Outlet
//   return <Outlet />;
// }
