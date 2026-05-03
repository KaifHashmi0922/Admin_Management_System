// src/pages/EmployeeProfileView.jsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  MapPin
} from "lucide-react";
import { useEmployeeProfileView } from "../../api/hooks/Employee/useEmployeeProfileView"

// Presentational Components (Pure UI)
const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-sm hover:border-slate-200 transition-all duration-200 group">
    <div className="w-12 h-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-lg font-bold text-slate-900 truncate">
        {value || "-"}
      </p>
    </div>
  </div>
);

const TaskCard = ({ task }) => (
  <div className="group p-6 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all duration-200 bg-white">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-bold text-lg text-slate-900">{task.title}</h4>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              task.status === "completed"
                ? "bg-emerald-100 text-emerald-800"
                : task.status === "in-progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {task.status.replace("-", " ").toUpperCase()}
          </span>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-4">
          {task.description}
        </p>
      </div>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
      <div className="flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{task.dueDate}</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            task.priority === "High" ? "text-red-600" : "text-orange-600"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              task.priority === "High" ? "bg-red-500" : "bg-orange-500"
            }`}
          />
          <span className="font-semibold uppercase tracking-wide">
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="group p-6 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all duration-200 bg-white">
    <h4 className="font-bold text-lg text-slate-900 mb-3">{project.name}</h4>
    <p className="text-slate-700 text-sm mb-4 leading-relaxed">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.skills?.slice(0, 3).map((skill, idx) => (
        <span
          key={idx}
          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-xl"
        >
          {skill}
        </span>
      ))}
      {project.skills && project.skills.length > 3 && (
        <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">
          +{project.skills.length - 3} more
        </span>
      )}
    </div>
    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-sm text-slate-600">
      <div className="flex items-center gap-2 font-semibold">
        <Briefcase className="w-4 h-4 text-slate-400" />
        <span>{project.role}</span>
      </div>
      <div className="flex items-center gap-2 font-semibold">
        <Calendar className="w-4 h-4 text-slate-400" />
        <span>
          {project.startDate} → {project.endDate}
        </span>
      </div>
    </div>
  </div>
);

// Container Component (Smart Component)
export default function EmployeeProfileView() {
  const { email } = useParams();
  const { employee, tasks, projects, loading, error, navigate } =
    useEmployeeProfileView(email);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl p-12 shadow-xl border max-w-sm w-full text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Loading Profile
          </h3>
          <p className="text-slate-600">Please wait...</p>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl p-12 shadow-xl border max-w-sm w-full text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-2">Error</h3>
          <p className="text-slate-600">
            {error || "Employee not found or data unavailable."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100 px-6 py-12 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-md border border-slate-200 hover:bg-slate-100 hover:shadow-lg transition-all duration-200 font-semibold text-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Team
          </button>
          <div className="text-right">
            <div
              className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                employee.is_logged ? "bg-green-400" : "bg-slate-300"
              }`}
            ></div>
            <p className="text-sm font-semibold text-green-700">
              {employee.is_logged ? "Online Now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-12">
            {/* Avatar */}
            <div className="w-28 h-28 lg:w-36 lg:h-36 mx-auto lg:mx-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white mb-8 lg:mb-0">
              <Users className="w-14 lg:w-18 h-14 lg:h-18 text-white font-bold" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 lg:pt-4">
              {/* Name & Status */}
              <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                  {employee.fullname}
                </h1>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Status pill from live data */}
                  <div
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-lg shadow-sm border-2 ${
                      employee.status
                        ? "bg-emerald-100 border-emerald-200 text-emerald-800"
                        : "bg-red-100 border-red-200 text-red-700"
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    {employee.status ? "Active Employee" : "Inactive Employee"}
                  </div>

                  {/* Role pill */}
                  <div className="flex items-center gap-2 px-6 py-3 bg-blue-100 border-2 border-blue-200 rounded-2xl font-semibold text-blue-800 text-lg shadow-sm">
                    <Briefcase className="w-5 h-5" />
                    {employee.role}
                  </div>
                </div>

                {/* Profile Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-200 mt-8">
                  <div className="space-y-4">
                    <ProfileField
                      icon={<Mail className="w-6 h-6 text-blue-600" />}
                      label="Email Address"
                      value={employee.email}
                    />
                    <ProfileField
                      icon={<Phone className="w-6 h-6 text-green-600" />}
                      label="Phone Number"
                      value={employee.phone}
                    />
                  </div>
                  <div className="space-y-4">
                    <ProfileField
                      icon={<Calendar className="w-6 h-6 text-purple-600" />}
                      label="Join Date"
                      value={employee.joining}
                    />
                    <ProfileField
                      icon={<MapPin className="w-6 h-6 text-orange-600" />}
                      label="Location"
                      value={employee.location}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  📋 Tasks ({tasks.length})
                </h2>
                <p className="text-slate-600">Assigned work items</p>
              </div>
            </div>
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  🎯 Projects ({projects.length})
                </h2>
                <p className="text-slate-600">Current assignments</p>
              </div>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
