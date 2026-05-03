import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, Edit3, Trash2, CheckCircle2, Clock, Calendar, 
  DollarSign, Users, Folder, TrendingUp, AlertCircle, BarChart3,
  ChevronDown, ChevronUp, FileText, MessageSquare, Star
} from "lucide-react";

// COMPLETE MOCK DATA - ALL INFORMATION
const mockProjectsData = [
  { 
    id: 1, 
    name: "CRM System Development", 
    client: "Acme Corporation", 
    budget: 250000, 
    spent: 187500, 
    progress: 75, 
    status: true, 
    endDate: "30 Jun 2026", 
    teamSize: 4,
    priority: "High",
    description: "Customer Relationship Management system with advanced analytics, reporting, and team collaboration features for enterprise clients",
    startDate: "01 Jan 2026",
    duration: 180,
    daysRemaining: 115,
    tags: ["CRM", "Enterprise", "SaaS", "Analytics"],
    team: [
      { id: 1, name: "Priya Sharma", role: "Project Lead", avatar: "PS", status: "online", email: "priya@acme.com" },
      { id: 2, name: "Rahul Kumar", role: "Frontend Dev", avatar: "RK", status: "online", email: "rahul@acme.com" },
      { id: 3, name: "Amit Mishra", role: "Backend Dev", avatar: "AM", status: "away", email: "amit@acme.com" },
      { id: 4, name: "Sneha Patel", role: "UI/UX Designer", avatar: "SP", status: "offline", email: "sneha@acme.com" },
    ],
    tasks: [
      { id: 1, title: "Database Design & Schema", status: "completed", assignee: "Amit Mishra", dueDate: "15 Jan 2026", priority: "High", progress: 100 },
      { id: 2, title: "RESTful API Development", status: "completed", assignee: "Amit Mishra", dueDate: "28 Feb 2026", priority: "High", progress: 100 },
      { id: 3, title: "React Frontend Components", status: "in-progress", assignee: "Rahul Kumar", dueDate: "15 Mar 2026", priority: "Medium", progress: 60 },
      { id: 4, title: "JWT User Authentication", status: "in-progress", assignee: "Priya Sharma", dueDate: "20 Mar 2026", priority: "High", progress: 40 },
      { id: 5, title: "End-to-End Testing & QA", status: "pending", assignee: "Team", dueDate: "10 Apr 2026", priority: "High", progress: 0 },
    ],
    milestones: [
      { id: 1, title: "Project Kickoff & Planning", date: "01 Jan 2026", status: "completed" },
      { id: 2, title: "UI/UX Design Approval", date: "15 Feb 2026", status: "completed" },
      { id: 3, title: "Backend Development Complete", date: "31 Mar 2026", status: "in-progress" },
      { id: 4, title: "Frontend Integration", date: "15 Apr 2026", status: "pending" },
    ],
    budget: {
      total: 250000,
      spent: 187500,
      remaining: 62500,
      categories: [
        { name: "Development", amount: 120000, percentage: 64 },
        { name: "Design", amount: 45000, percentage: 24 },
        { name: "Testing", amount: 15000, percentage: 8 },
        { name: "Deployment", amount: 7500, percentage: 4 },
      ]
    },
    recentActivity: [
      { id: 1, user: "Priya Sharma", action: "updated task status", target: "User Authentication", time: "2 hours ago" },
      { id: 2, user: "Rahul Kumar", action: "completed", target: "Login Component", time: "5 hours ago" },
      { id: 3, user: "Amit Mishra", action: "commented on", target: "API Documentation", time: "1 day ago" },
      { id: 4, user: "Sneha Patel", action: "uploaded file", target: "Final Mockups.zip", time: "2 days ago" },
    ]
  }
];

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleStatus = () => {
    setProject(prev => ({ ...prev, status: !prev.status }));
  };

  useEffect(() => {
    const projectData = mockProjectsData.find(p => p.id === parseInt(id)) || mockProjectsData[0];
    setProject(projectData);
  }, [id]);

  if (!project) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const getPriorityColor = (priority) => {
    const colors = {
      'Critical': 'bg-gradient-to-r from-red-400 to-orange-500 text-white border-red-300',
      'High': 'bg-gradient-to-r from-orange-400 to-amber-500 text-white border-orange-300',
      'Medium': 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 border-yellow-300',
      'Low': 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-emerald-300'
    };
    return colors[priority] || 'bg-slate-400 text-white';
  };

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'pending': 'bg-slate-100 text-slate-800 border-slate-200'
    };
    return colors[status] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-4 py-12">
      {/* 🎯 PERFECT HEADER */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-6 mb-8">
          <button
            onClick={() => navigate('/dashboard/projects')}
            className="group p-4 bg-gradient-to-br from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-rose-200/50 flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-rose-600 group-hover:text-rose-700" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-6 mb-4">
              <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50">
                <Folder className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-4 mb-4 flex-wrap">
                  <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-rose-900 to-pink-900 bg-clip-text text-transparent leading-tight break-words">
                    {project.name}
                  </h1>
                  <span className={`px-6 py-3 text-xl font-bold rounded-3xl shadow-2xl border-2 ${getPriorityColor(project.priority)} whitespace-nowrap flex-shrink-0`}>
                    {project.priority}
                  </span>
                </div>
                <p className="text-xl lg:text-2xl text-slate-700 font-semibold leading-relaxed max-w-4xl">
                  {project.description}
                </p>
                <p className="text-lg text-slate-600 mt-2 flex items-center gap-4">
                  <span>Client:</span>
                  <span className="font-bold text-slate-900">{project.client}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🟢 ACTION BAR WITH REPORTS BUTTON */}
        <div className="bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 p-6 mb-12 sticky top-4 z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-lg font-semibold text-slate-700">
                <span>Status:</span>
                <span className={`px-4 py-2 rounded-2xl font-bold text-sm ${project.status ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                  {project.status ? "Active" : "Paused"}
                </span>
              </div>

              <button
                onClick={toggleStatus}
                className={`relative w-40 h-16 rounded-3xl px-6 shadow-2xl border-4 font-bold text-lg transition-all duration-700 flex items-center justify-between overflow-hidden group ${
                  project.status 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-400 shadow-emerald-500/50' 
                    : 'bg-gradient-to-r from-slate-200 to-slate-300 border-slate-300 shadow-slate-300/50'
                }`}
              >
                <span className={`${project.status ? 'left-6' : 'right-6'} absolute transition-all duration-700 font-bold text-white z-10 group-hover:scale-105`}>
                  {project.status ? "Active" : "Paused"}
                </span>
                <div className={`w-14 h-14 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-slate-200 transition-all duration-700 ${
                  project.status ? 'translate-x-24' : 'translate-x-2'
                }`} />
              </button>
            </div>

            {/* 🔥 NEW REPORTS BUTTON + Edit + Delete */}
            <div className="flex items-center gap-4 flex-wrap justify-end">
              <button className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-10 lg:px-12 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 border border-blue-400/50 whitespace-nowrap flex-shrink-0">
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                📊 Reports
              </button>
              
              <Link 
                to={`/dashboard/project/edit/${project.id}`} 
                className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-10 lg:px-12 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 border border-emerald-400/50 whitespace-nowrap flex-shrink-0"
              >
                <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Edit Project
              </Link>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="group bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-10 lg:px-12 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 border border-rose-400/50 whitespace-nowrap flex-shrink-0"
              >
                <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Delete Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 STATS CARDS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12 px-4">
        {[
          { icon: BarChart3, value: `${project.progress}%`, label: "Progress", color: "from-blue-500 to-indigo-600", bg: "from-blue-50 to-indigo-50" },
          { icon: DollarSign, value: `₹${(project.budget.spent/1000).toFixed(0)}K`, label: "Budget Used", color: "from-emerald-500 to-teal-600", bg: "from-emerald-50 to-teal-50" },
          { icon: Users, value: project.team.length, label: "Team Members", color: "from-purple-500 to-pink-600", bg: "from-purple-50 to-pink-50" },
          { icon: Clock, value: `${project.daysRemaining}`, label: "Days Left", color: "from-orange-500 to-rose-600", bg: "from-orange-50 to-rose-50" }
        ].map((stat, idx) => (
          <div key={idx} className="group bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 p-8 hover:shadow-3xl hover:-translate-y-3 transition-all duration-700 cursor-pointer overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`} />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 ${stat.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-700 flex-shrink-0`}>
                  <stat.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-600 font-semibold uppercase tracking-wide opacity-80">{stat.label}</p>
                  <p className="text-4xl xl:text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mt-2 break-words">{stat.value}</p>
                </div>
              </div>
              {stat.label === "Progress" && (
                <div className="w-full h-3 bg-slate-200/50 rounded-2xl overflow-hidden group-hover:bg-slate-200/80 transition-all z-10 relative">
                  <div className={`h-3 ${stat.color} rounded-2xl shadow-lg transition-all duration-1000`} style={{ width: `${project.progress}%` }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🗂️ TABS */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-3xl rounded-3xl shadow-3xl border border-white/70 mb-12 overflow-hidden">
          <div className="flex overflow-x-auto -mx-4 px-4 pb-4 -mb-4 space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: Folder },
              { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'budget', label: 'Budget', icon: DollarSign },
              { id: 'activity', label: 'Activity', icon: TrendingUp },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-6 font-bold text-lg whitespace-nowrap rounded-3xl transition-all duration-500 border-4 mx-2 shadow-xl flex-shrink-0 group hover:-translate-y-1 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-400 shadow-blue-500/50 scale-105' 
                    : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow-2xl'
                }`}
              >
                <tab.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 📋 FULL TAB CONTENT */}
        <div className="space-y-8">
          {/* OVERVIEW - FULL INFO */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Timeline */}
              <div className="bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 p-8">
                <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                  <Calendar className="w-12 h-12 text-blue-600" />
                  Timeline
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                      <Calendar className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-slate-900">{project.startDate}</p>
                      <p className="text-emerald-600 font-bold text-xl mt-1">Start Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-orange-50 to-rose-50 rounded-3xl border border-orange-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                      <Clock className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-slate-900">{project.daysRemaining} days</p>
                      <p className="text-orange-600 font-bold text-xl mt-1">Remaining</p>
                      <p className="text-slate-600">Ends {project.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                      <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-slate-900">{project.duration} days</p>
                      <p className="text-blue-600 font-bold text-xl mt-1">Total Duration</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags & Client */}
              <div className="bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 p-8 space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">Client Information</h4>
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-3xl border border-slate-200">
                    <p className="text-3xl font-black text-slate-900 mb-2">{project.client}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 font-bold rounded-2xl text-sm border border-blue-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TASKS - FULL INFO */}
          {activeTab === 'tasks' && (
            <div className="max-w-6xl mx-auto space-y-6">
              {project.tasks.map((task) => (
                <div key={task.id} className="group bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-start justify-between gap-6 mb-6">
                    <div className="flex items-start gap-6 flex-1">
                      <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl border-4 flex-shrink-0 ${
                        task.status === 'completed' 
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400' 
                          : task.status === 'in-progress'
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 animate-pulse'
                          : 'bg-gradient-to-br from-slate-400 to-slate-500 border-slate-400'
                      }`}>
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="w-12 h-12 text-white" />
                        ) : task.status === 'in-progress' ? (
                          <Clock className="w-12 h-12 text-white" />
                        ) : (
                          <div className="w-10 h-10 bg-white/90 rounded-2xl shadow-xl animate-ping" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-3xl font-black text-slate-900 mb-2 break-words">{task.title}</h4>
                        <p className="text-xl text-slate-700 mb-4">Assigned to: <span className="font-bold text-slate-900">{task.assignee}</span></p>
                        <div className="flex items-center gap-4 text-lg">
                          <span className={`px-4 py-2 font-bold rounded-2xl shadow-lg ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <div className="w-24 h-3 bg-slate-200/50 rounded-xl overflow-hidden">
                            <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg" style={{ width: `${task.progress}%` }} />
                          </div>
                          <span>{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">{task.dueDate}</p>
                        <p className="text-sm text-slate-600 uppercase tracking-wide">Due Date</p>
                      </div>
                      <span className={`px-8 py-4 text-xl font-bold rounded-3xl shadow-2xl border-4 ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TEAM - FULL INFO */}
          {activeTab === 'team' && (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.team.map((member) => (
                  <div key={member.id} className="group bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl border-4 border-white">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-xs font-bold ${
                          member.status === 'online' ? 'bg-emerald-500 text-white' :
                          member.status === 'away' ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white'
                        }`}>
                          {member.status === 'online' ? '●' : member.status.slice(0,1).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-2xl font-black text-slate-900 mb-2 break-words">{member.name}</h4>
                        <p className="text-xl text-slate-700 mb-4">{member.role}</p>
                        <p className="text-lg text-slate-600 break-all">{member.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BUDGET - FULL INFO */}
          {activeTab === 'budget' && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-2xl">
                  <p className="text-emerald-100 text-lg font-medium mb-4">Total Budget</p>
                  <p className="text-6xl font-black mb-6">₹{project.budget.total.toLocaleString()}</p>
                  <div className="grid grid-cols-3 gap-4 text-2xl">
                    <div className="text-center">
                      <p className="font-bold">₹{(project.budget.spent/1000).toFixed(0)}K</p>
                      <p className="text-sm opacity-90">Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">₹{(project.budget.remaining/1000).toFixed(0)}K</p>
                      <p className="text-sm opacity-90">Remaining</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{Math.round((project.budget.spent/project.budget.total)*100)}%</p>
                      <p className="text-sm opacity-90">Utilized</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {project.budget.categories.map((category, idx) => (
                    <div key={idx} className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-2xl font-bold text-slate-900">{category.name}</h4>
                        <p className="text-2xl font-bold text-slate-900">₹{category.amount.toLocaleString()}</p>
                      </div>
                      <div className="w-full h-4 bg-slate-200/50 rounded-2xl overflow-hidden">
                        <div className="h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg transition-all" style={{ width: `${category.percentage}%` }} />
                      </div>
                      <p className="text-sm text-slate-600 mt-2">{category.percentage}% of total budget</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ACTIVITY - FULL INFO */}
          {activeTab === 'activity' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/60 p-8">
                <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                  <TrendingUp className="w-12 h-12 text-purple-600" />
                  Recent Activity
                </h3>
                <div className="space-y-6">
                  {project.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-6 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl hover:bg-slate-100 transition-all group">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0 mt-1">
                        <MessageSquare className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xl text-slate-900 leading-relaxed">
                          <span className="font-black text-2xl">{activity.user}</span>{' '}
                          <span className="font-semibold text-slate-700">{activity.action}</span>{' '}
                          <span className="font-bold text-blue-600">{activity.target}</span>
                        </p>
                        <p className="text-lg text-slate-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gradient-to-br from-rose-500/60 to-pink-600/60 backdrop-blur-2xl z-[10000] flex items-center justify-center p-8" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white/98 backdrop-blur-3xl rounded-3xl shadow-3xl max-w-2xl w-full p-12 border border-white/60 mx-4" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border-8 border-white/50">
                <AlertCircle className="w-16 h-16 text-white drop-shadow-2xl" />
              </div>
              <h3 className="text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
                Delete Project?
              </h3>
              <p className="text-2xl text-slate-700 font-semibold leading-relaxed max-w-2xl mx-auto">
                This will permanently delete <span className="text-rose-600 font-black">"{project.name}"</span> and all associated data.
              </p>
            </div>
            <div className="flex gap-6 pt-12 border-t border-slate-200/50">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-6 px-12 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-800 font-black text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  navigate('/dashboard/projects');
                }}
                className="flex-1 py-6 px-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xl rounded-3xl shadow-3xl hover:shadow-4xl hover:-translate-y-1 transition-all duration-500"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
