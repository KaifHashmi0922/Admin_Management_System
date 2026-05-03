// src/pages/ProjectList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Folder, DollarSign, TrendingUp, Clock, Users, Tag, Edit3, Trash2, Eye,
  Search, CheckCircle, BarChart3, Calendar
} from 'lucide-react';
import { useProjectList } from "../../api/hooks/Project/useProjectList"

export default function ProjectsList() {
  const {
    projects, filteredProjects, loading, error, searchTerm, setSearchTerm,
    currentPage, setCurrentPage, totalPages, refetch, toggleStatus, deleteProject
  } = useProjectList();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        filteredProjects={filteredProjects}
      />
      
      {/* Mobile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 lg:hidden max-w-7xl mx-auto">
        {projects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            toggleStatus={toggleStatus} 
            deleteProject={deleteProject} 
          />
        ))}
      </div>

      {/* Desktop Table */}
      <DesktopTable 
        projects={projects} 
        toggleStatus={toggleStatus} 
        deleteProject={deleteProject}
        getPriorityColor={getPriorityColor}
      />

      {/* Empty State */}
      {filteredProjects.length === 0 && <EmptyState />}

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationContainer 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

// ✅ FIXED Header - Passes filteredProjects prop
function Header({ searchTerm, setSearchTerm, filteredProjects }) {
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-4 h-20 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-lg" />
          <div>
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Project Management
            </h1>
            <p className="text-slate-600 text-lg font-medium mt-2">
              ({filteredProjects?.length || 0} / {filteredProjects?.length || 0} projects)
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-80 lg:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="🔍 Search project, client, priority..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-semibold shadow-inner"
            />
          </div>
          <Link to="/dashboard/project/add" className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            <Folder className="w-6 h-6 group-hover:scale-110 transition-transform" />
            New Project
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xl font-semibold text-slate-700">Loading projects...</p>
      </div>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
        <p className="text-2xl font-bold text-red-600 mb-4">{error}</p>
        <button onClick={onRetry} className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all">
          Retry
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24 bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl max-w-2xl mx-auto">
      <Folder className="w-24 h-24 text-slate-400 mx-auto mb-8" />
      <h3 className="text-3xl font-bold text-slate-700 mb-4">No projects yet</h3>
      <p className="text-xl text-slate-500 mb-8">Create your first project to get started.</p>
      <Link to="/dashboard/project/add" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
        <Folder className="w-6 h-6" />
        Create First Project
      </Link>
    </div>
  );
}

// ✅ NEW: ProjectCard Component (Mobile)
function ProjectCard({ project, toggleStatus, deleteProject }) {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="group bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all duration-300 overflow-hidden">
      {/* Status Badge */}
      <div className={`absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
        project.status 
          ? 'bg-emerald-500 shadow-emerald-500/50' 
          : 'bg-orange-400 shadow-orange-400/50'
      }`}>
        {project.status ? (
          <CheckCircle className="w-8 h-8 text-white" />
        ) : (
          <Clock className="w-8 h-8 text-white" />
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-3 mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-lg" 
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight">{project.name}</h3>
      
      <span className={`inline-block text-lg font-semibold px-4 py-2 rounded-2xl mt-2 ${getPriorityColor(project.priority)}`}>
        {project.priority}
      </span>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
        <StatCard icon={<DollarSign className="w-6 h-6" />} label="Budget Used" value={`₹${(project.spent/1000).toFixed(0)}K`} />
        <StatCard icon={<BarChart3 className="w-6 h-6" />} label={`${project.progress}%`} value="Progress" />
        <StatCard icon={<Users className="w-6 h-6" />} label={`${project.teamSize}`} value="Team" />
        <StatCard icon={<Calendar className="w-6 h-6" />} label={project.endDate} value="Ends" />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-6 border-t border-slate-100">
        <Link to={`/dashboard/project/${project.id}`} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold text-center shadow-lg hover:shadow-xl transition-all">
          View Dashboard
        </Link>
        <ToggleButton 
          isActive={project.status}
          onToggle={() => toggleStatus(project.id)}
          activeColor="emerald"
          inactiveColor="orange"
        />
        <button 
          onClick={() => deleteProject(project.id)}
          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ✅ NEW: DesktopTable Component
function DesktopTable({ projects, toggleStatus, deleteProject, getPriorityColor }) {
  return (
    <div className="hidden lg:block mb-12 max-w-7xl mx-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
              <tr className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                <th className="px-8 py-6 text-left">Project</th>
                <th className="px-8 py-6 text-left">Client</th>
                <th className="px-8 py-6 text-center">Budget</th>
                <th className="px-8 py-6 text-center">Progress</th>
                <th className="px-8 py-6 text-center">Team</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-center">Ends</th>
                <th className="px-8 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Folder className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900">{project.name}</p>
                        <span className={`inline-flex items-center text-sm font-semibold px-3 py-1 rounded-xl mt-1 ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-semibold text-slate-800">{project.client}</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-slate-900">₹{(project.spent/1000).toFixed(0)}K</p>
                      <p className="text-sm text-slate-500">of ₹{(project.budget/1000).toFixed(0)}K</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg font-bold">{project.progress}%</span>
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl font-semibold text-slate-700">
                      <Users className="w-4 h-4" />
                      {project.teamSize}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <ToggleButton
                        isActive={project.status}
                        onToggle={() => toggleStatus(project.id)}
                        activeColor="emerald"
                        inactiveColor="orange"
                      />
                      <span className="text-sm font-semibold text-slate-600">
                        {project.status ? 'Active' : 'Paused'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl font-semibold text-slate-700">
                      <Calendar className="w-4 h-4" />
                      {project.endDate}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 justify-center">
                      <Link to={`/dashboard/project/${project.id}`} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                        View
                      </Link>
                      <Link to={`/dashboard/project/edit/${project.id}`} className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                        Edit
                      </Link>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ✅ NEW: Supporting Components
function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl group-hover:shadow-sm transition-all">
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-800 text-base">{value}</p>
        <p className="text-sm text-slate-600">{label}</p>
      </div>
    </div>
  );
}

function ToggleButton({ isActive, onToggle, activeColor = "emerald", inactiveColor = "orange", size = "md" }) {
  const baseSize = size === "lg" ? "w-16 h-8" : "w-14 h-7";
  const knobSize = size === "lg" ? "w-7 h-7" : "w-6 h-6";
  const travel = size === "lg" ? "translate-x-8" : "translate-x-7";

  return (
    <button
      onClick={onToggle}
      className={`relative ${baseSize} rounded-full border-4 shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50 hover:scale-105 ${
        isActive 
          ? 'bg-emerald-500 border-emerald-400 shadow-emerald-400/50' 
          : 'bg-orange-400 border-orange-300 shadow-orange-300/50'
      }`}
    >
      <div className={`absolute ${knobSize} bg-white rounded-full shadow-lg border-2 border-gray-200 transition-all duration-300 ${isActive ? travel : "translate-x-1"}`} />
    </button>
  );
}

function PaginationContainer({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              currentPage === page
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-md'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

function getPriorityColor(priority) {
  switch(priority) {
    case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
    case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default: return 'bg-slate-100 text-slate-800 border-slate-200';
  }
}
