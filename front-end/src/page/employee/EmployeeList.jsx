import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserX,
  Edit3,
  Eye,
  Mail,
  Phone,
  Calendar,
  Search,
  LogIn,
  CheckCircle
} from "lucide-react";
import { useEmployeesList } from "../../api/hooks/Employee/useEmployeeList";
import { useEmployeeStatus } from "../../api/hooks/Employee/useEmployeeStatus";

export default function EmployeesList() {
  const {
    employees,
    searchTerm,
    setSearchTerm,
    fetchEmployees,
    filteredEmployees,
    toggleLoginStatus,
    toggleActiveStatus,
    handleDelete, // kept in hook, but not used in UI now
    loading
  } = useEmployeesList();

  const { toggleStatus, loading: statusLoading, error } = useEmployeeStatus();  

  const handleStatusToggle = async (email) => {
    await toggleStatus(email);
    await fetchEmployees(); // Refetch to sync UI
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 mb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-3 sm:w-4 h-16 sm:h-20 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-lg"></div>
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Team Members
              </h1>
              <p className="text-slate-600 text-sm sm:text-lg mt-1 sm:mt-2 font-medium">
                ({filteredEmployees.length} / {employees.length} total)
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-end sm:items-center">
            <div className="relative w-full sm:w-64 lg:w-80">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 " />

                <input
                  type="text"
                  placeholder="Search employee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border text-black border-gray-300 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            {/* Add Employee button (white bg, blue text) */}
            <Link
              to="/dashboard/employee/register"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white text-blue-600 font-semibold py-2.5 sm:py-3 px-6 sm:px-8 shadow-sm hover:bg-blue-50 hover:shadow-md hover:-translate-y-[1px] transition-all text-sm sm:text-base"
            >
              <Users className="w-4 sm:w-5 h-4 sm:h-5" />
              Add Employee
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 lg:hidden">
        {filteredEmployees.map((emp) => (
          <EmployeeCard
            key={emp.email}
            emp={emp}
            toggleActiveStatus={handleStatusToggle}
            toggleLoginStatus={toggleLoginStatus}
          />
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden lg:block mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200/60">
                <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  <th className="px-6 py-4 text-left">Employee</th>
                  <th className="px-6 py-4 text-left">Contact</th>
                  <th className="px-6 py-4 text-left">Joining</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Session</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.email}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {emp.fullname}
                          </p>
                          <p className="inline-flex items-center mt-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                            {emp.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail className="w-4 h-4 text-blue-500" />
                          <span className="font-medium truncate max-w-xs">
                            {emp.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">{emp.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>
                          Joined:{" "}
                          <span className="text-blue-600 font-bold">
                            {emp.joining}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
                          <CheckCircle className="w-3 h-3" />
                          {emp.status ? "Active" : "Deactive"}
                        </span>
                        <ToggleButton
                          isActive={emp.status}
                          onToggle={() => handleStatusToggle(emp.email)}
                          activeColor="emerald"
                          inactiveColor="red"
                          size="sm"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
                          <LogIn className="w-3 h-3" />
                          {emp.is_logged ? "Login" : "Logout"}
                        </span>
                        <ToggleButton
                          isActive={emp.is_logged}
                          onToggle={() => toggleLoginStatus(emp.email)}
                          activeColor="green"
                          inactiveColor="gray"
                          size="sm"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Improved Edit button */}
                        <Link
                          to={`/dashboard/employee/edit/${emp.email}`}
                          className="inline-flex items-center gap-2 border border-amber-500 bg-amber-50 text-amber-700 px-3 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-amber-100 hover:shadow-md hover:-translate-y-[1px] transition-all"
                          aria-label={`Edit ${emp.fullname}`}
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Details
                        </Link>
                        <Link
                          to={`/dashboard/employee/view/${emp.email}`}
                          className="inline-flex items-center justify-center w-9 h-9 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg shadow-md"
                          aria-label={`View ${emp.fullname}`}
                        >
                          <Eye className="w-4 h-4 text-slate-600" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center">
                      <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-700">
                        {searchTerm
                          ? "No matches found"
                          : "No employees yet"}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 mb-3">
                        {searchTerm
                          ? "Try a different search term."
                          : "Add your first team member to get started."}
                      </p>
                      {/* Empty-state Add Employee button (white bg, blue text) */}
                      <Link
                        to="/dashboard/employee/register"
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white text-blue-600 font-semibold py-2 px-5 shadow-sm hover:bg-blue-50 hover:shadow-md hover:-translate-y-[1px] transition-all text-sm"
                      >
                        <Users className="w-4 h-4" />
                        Add Employee
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* CARD COMPONENT (mobile / tablet) */
function EmployeeCard({
  emp,
  toggleActiveStatus,
  toggleLoginStatus
}) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-white/50 p-6 lg:p-8 relative overflow-hidden">
      {/* Status Badge */}
      <div
        className={`absolute top-4 right-8 w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border-2 sm:border-4 ${
          emp.is_logged
            ? "bg-emerald-400 border-emerald-300 shadow-emerald-300/50"
            : "bg-red-400 border-red-300 shadow-red-300/50"
        }`}
      >
        {emp.is_logged ? (
          <UserCheck className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
        ) : (
          <UserX className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 lg:mb-8 pt-2 lg:pt-4 gap-4 lg:gap-0">
        <div className="flex items-center gap-3 lg:gap-4 flex-1">
          <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Users className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
              {emp.fullname}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-slate-600 bg-slate-100 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl mt-1">
              {emp.role}
            </p>
          </div>
        </div>

        {/* Toggle buttons (mobile / desktop inside card) */}
        <div className="flex mt-5 flex-col items-end gap-3 lg:gap-4 w-full lg:w-auto lg:ml-4">
          {/* Mobile rows */}
          <div className="flex items-center justify-between w-full lg:hidden gap-3 py-1">
            <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {emp.status ? "Active" : "Deactive"}
            </span>
            <ToggleButton
              isActive={emp.status}
              onToggle={() => toggleActiveStatus(emp.email)}
              activeColor="emerald"
              inactiveColor="red"
              size="sm"
            />
          </div>

          <div className="flex items-center justify-between w-full lg:hidden gap-3 py-1">
            <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
              <LogIn className="w-3 h-3" />
              {emp.is_logged ? "Login" : "Logout"}
            </span>
            <ToggleButton
              isActive={emp.is_logged}
              onToggle={() => toggleLoginStatus(emp.email)}
              activeColor="green"
              inactiveColor="gray"
              size="sm"
            />
          </div>

          {/* Desktop inside card */}
          <div className="hidden lg:flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <CheckCircle className="w-3 h-3" />
              Status
            </div>
            <ToggleButton
              isActive={emp.status}
              onToggle={() => toggleActiveStatus(emp.email)}
              activeColor="emerald"
              inactiveColor="red"
            />

            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <LogIn className="w-3 h-3" />
              Session
            </div>
            <ToggleButton
              isActive={emp.is_logged}
              onToggle={() => toggleLoginStatus(emp.email)}
              activeColor="green"
              inactiveColor="gray"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3 sm:space-y-4 mb-8 lg:mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          </div>
          <span className="text-slate-800 font-semibold text-sm sm:text-base break-words">
            {emp.email}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          </div>
          <span className="text-slate-800 font-semibold text-sm sm:text-base">
            {emp.phone}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          </div>
          <span className="text-slate-800 font-semibold text-sm sm:text-base">
            Joined:{" "}
            <span className="text-blue-600 font-bold">{emp.joining}</span>
          </span>
        </div>
      </div>

      {/* Actions (no delete, improved Edit) */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-5 sm:pt-6 border-t border-slate-100/50 bg-white/50 rounded-b-xl sm:rounded-b-2xl p-4 backdrop-blur-sm">
        <Link
          to={`/dashboard/employee/edit/${emp.email}`}
          className="flex-1 inline-flex items-center justify-center gap-2 border border-amber-500 bg-amber-50 text-amber-700 py-3 px-5 sm:py-4 sm:px-6 rounded-xl shadow-sm hover:bg-amber-100 hover:shadow-md hover:-translate-y-[1px] transition-all font-semibold text-sm sm:text-base"
          aria-label={`Edit ${emp.fullname}`}
        >
          <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
          Edit Employee
        </Link>
        <Link
          to={`/dashboard/employee/view/${emp.email}`}
          className="w-11 sm:w-14 h-11 sm:h-14 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shadow-lg"
          aria-label={`View ${emp.fullname}`}
        >
          <Eye className="w-5 sm:w-6 h-5 sm:h-6 text-slate-600" />
        </Link>
      </div>
    </div>
  );
}

/* ToggleButton */
function ToggleButton({
  isActive,
  onToggle,
  activeColor,
  inactiveColor,
  size = "md"
}) {
  const baseSize = size === "sm" ? "w-9 h-5" : "w-11 h-6";
  const knobSize = size === "sm" ? "w-4 h-4 top-0.5" : "w-5 h-5 top-0.5";
  const travel = size === "sm" ? "translate-x-4" : "translate-x-5";

  const colors = {
    green: {
      active: "bg-green-500 border-green-400 shadow-green-200/50",
      inactive: "bg-slate-200 border-slate-300 shadow-slate-100"
    },
    emerald: {
      active: "bg-emerald-500 border-emerald-400 shadow-emerald-200/50",
      inactive: "bg-red-500 border-red-400 shadow-red-200/50"
    },
    gray: {
      active: "bg-slate-500 border-slate-400 shadow-slate-200/50",
      inactive: "bg-slate-200 border-slate-300 shadow-slate-100"
    },
    red: {
      active: "bg-orange-500 border-orange-400 shadow-orange-200/50",
      inactive: "bg-red-500 border-red-400 shadow-red-200/50"
    }
  };

  return (
    <button
      onClick={onToggle}
      className={`relative ${baseSize} rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-400/50 shadow-sm transition-all duration-200 ease-in-out overflow-hidden ${
        isActive
          ? colors[activeColor].active
          : colors[inactiveColor || activeColor].inactive
      }`}
      aria-label={`Toggle ${isActive ? "on" : "off"}`}
    >
      <div
        className={`absolute ${knobSize} bg-white rounded-full shadow-md border transition-transform duration-200 ease-in-out ${
          isActive ? travel : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
