// Report.jsx
import React, { useState } from "react";
import {
  Folder,
  CheckCircle2,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  MessageSquare,
  FileText,
} from "lucide-react";

const mockProject = {
  id: 1,
  name: "AI Project Management Dashboard",
  status: "In Progress",
  owner: "Trolly Mate Admin",
  startDate: "2025-12-01",
  dueDate: "2026-03-30",
  progress: 68,
  team: [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Product Manager",
      email: "priya.sharma@example.com",
      avatar: "PS",
      status: "online",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Frontend Engineer",
      email: "rahul.kumar@example.com",
      avatar: "RK",
      status: "away",
    },
    {
      id: 3,
      name: "Amit Mishra",
      role: "Backend Engineer",
      email: "amit.mishra@example.com",
      avatar: "AM",
      status: "offline",
    },
    {
      id: 4,
      name: "Sneha Patel",
      role: "UI/UX Designer",
      email: "sneha.patel@example.com",
      avatar: "SP",
      status: "online",
    },
  ],
  tasks: [
    {
      id: 1,
      title: "Design Dashboard Layout",
      assignee: "Sneha Patel",
      status: "Completed",
      priority: "High",
      due: "2026-01-15",
    },
    {
      id: 2,
      title: "Build Admin Auth API",
      assignee: "Amit Mishra",
      status: "In Progress",
      priority: "High",
      due: "2026-01-25",
    },
    {
      id: 3,
      title: "Implement Project Report Page",
      assignee: "Rahul Kumar",
      status: "In Review",
      priority: "Medium",
      due: "2026-02-05",
    },
    {
      id: 4,
      title: "Write API Documentation",
      assignee: "Priya Sharma",
      status: "Pending",
      priority: "Low",
      due: "2026-02-10",
    },
  ],
  budget: {
    total: 800000,
    spent: 350000,
    remaining: 450000,
    categories: [
      { name: "Design", amount: 150000, percentage: 19 },
      { name: "Development", amount: 400000, percentage: 50 },
      { name: "Marketing", amount: 150000, percentage: 19 },
      { name: "Operations", amount: 100000, percentage: 12 },
    ],
  },
  recentActivity: [
    {
      id: 1,
      user: "Priya Sharma",
      action: "updated task status",
      target: "User Authentication",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Rahul Kumar",
      action: "completed",
      target: "Login Component",
      time: "5 hours ago",
    },
    {
      id: 3,
      user: "Amit Mishra",
      action: "commented on",
      target: "API Documentation",
      time: "1 day ago",
    },
    {
      id: 4,
      user: "Sneha Patel",
      action: "uploaded file",
      target: "Final Mockups.zip",
      time: "2 days ago",
    },
  ],
};

const Report = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const project = mockProject;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 py-10 px-4 md:px-8">
      {/* background glow (lightened) */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute -top-32 -left-16 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-16 w-72 h-72 bg-indigo-300/35 rounded-full blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="relative max-w-7xl mx-auto mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-blue-500/80 mb-2">
            Project Report
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {project.name}
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-2 max-w-xl">
            Centralized report for project health, team performance, budget usage,
            and real‑time activity inside your admin dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-start md:justify-end">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300">
            {project.status}
          </span>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 text-slate-800 border border-slate-200 shadow-sm">
            Owner: {project.owner}
          </span>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-300">
            Progress {project.progress}%
          </span>
        </div>
      </div>

      {/* TABS */}
      <div className="relative max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-3 bg-white/90 border border-slate-200 rounded-2xl px-3 py-3 shadow-xl backdrop-blur">
          {[
            { id: "overview", label: "Overview", icon: Folder },
            { id: "tasks", label: "Tasks", icon: CheckCircle2 },
            { id: "team", label: "Team", icon: Users },
            { id: "budget", label: "Budget", icon: DollarSign },
            { id: "activity", label: "Activity", icon: Activity },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-xl border transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white border-transparent shadow-lg shadow-blue-300 scale-[1.02]"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-700"
                }`}
              >
                <tab.icon
                  className={`w-4 h-4 ${
                    active ? "text-white" : "text-blue-500"
                  }`}
                />
                <span>{tab.label}</span>
                {active && (
                  <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="relative max-w-7xl mx-auto space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Left: summary cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-6 backdrop-blur">
                <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-blue-500" />
                  Project Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
                  <div className="space-y-1">
                    <p className="text-slate-500">Start Date</p>
                    <p className="font-semibold text-slate-900">
                      {project.startDate}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500">Due Date</p>
                    <p className="font-semibold text-slate-900">
                      {project.dueDate}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-500">Overall Progress</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-emerald-600">
                        {project.progress}%
                      </p>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-600 mt-4">
                  Use this screen as the single source of truth for project status.
                  Connect actual APIs from your Django backend later to replace
                  the mock data with live metrics.
                </p>
              </div>

              <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-5 backdrop-blur">
                <h3 className="text-xs md:text-sm font-bold text-slate-900 mb-3">
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-slate-500">Total Tasks</p>
                    <p className="text-xl font-extrabold text-slate-900">
                      {project.tasks.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-slate-500">Team Members</p>
                    <p className="text-xl font-extrabold text-slate-900">
                      {project.team.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <p className="text-emerald-700 text-xs">Budget Spent</p>
                    <p className="text-xl font-extrabold text-emerald-700">
                      ₹{(project.budget.spent / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-slate-500">Latest Activity</p>
                    <p className="text-xs text-slate-800">
                      {project.recentActivity[0].user} •{" "}
                      {project.recentActivity[0].action}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: latest activity */}
            <div className="space-y-4">
              <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-5 backdrop-blur">
                <h3 className="text-xs md:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  Latest Activity
                </h3>
                <div className="space-y-3">
                  {project.recentActivity.slice(0, 3).map((act) => (
                    <div key={act.id} className="text-xs">
                      <p className="font-semibold text-slate-900">
                        {act.user}{" "}
                        <span className="font-normal text-slate-600">
                          {act.action}{" "}
                          <span className="text-blue-600">
                            "{act.target}"
                          </span>
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-500">{act.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-5 backdrop-blur">
                <h3 className="text-xs md:text-sm font-bold text-slate-900 mb-3">
                  Notes
                </h3>
                <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed">
                  Perfect place to demo your admin skills. Later, you can add
                  filters, export buttons, or connect this layout to real-time
                  analytics for your clients.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === "tasks" && (
          <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-6 backdrop-blur animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Tasks Overview
              </h2>
              <span className="text-[11px] text-slate-500">
                Showing {project.tasks.length} tasks
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50">
              <table className="min-w-full text-xs md:text-sm">
                <thead className="bg-slate-100">
                  <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-200">
                    <th className="py-3 px-4">Task</th>
                    <th className="py-3 px-4">Assignee</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {project.tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b border-slate-200 last:border-0 hover:bg-slate-100/80 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {task.title}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {task.assignee}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            task.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : task.status === "In Progress"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : task.status === "In Review"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-700 border border-slate-300"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            task.priority === "High"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : task.priority === "Medium"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-700 border border-slate-300"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{task.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === "team" && (
          <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-6 backdrop-blur animate-fade-in">
            <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Project Team ({project.team.length} Members)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              {project.team.map((member) => (
                <div
                  key={member.id}
                  className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-white transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 text-white font-bold flex items-center justify-center text-lg shadow-md">
                      {member.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                        member.status === "online"
                          ? "bg-emerald-400"
                          : member.status === "away"
                          ? "bg-amber-400"
                          : "bg-slate-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {member.name}
                    </p>
                    <p className="text-[11px] text-slate-500 mb-1">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-blue-600 break-all">
                      {member.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BUDGET TAB */}
        {activeTab === "budget" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-6 backdrop-blur">
              <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                Budget Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-500">Total Budget</p>
                  <p className="text-xl font-extrabold text-slate-900">
                    ₹{project.budget.total.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-emerald-700 text-[11px] font-semibold">
                    Spent
                  </p>
                  <p className="text-xl font-extrabold text-emerald-700">
                    ₹{(project.budget.spent / 1000).toFixed(0)}K
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-emerald-100 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                      style={{
                        width: `${
                          (project.budget.spent / project.budget.total) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-blue-700 text-[11px] font-semibold">
                    Remaining
                  </p>
                  <p className="text-xl font-extrabold text-slate-900">
                    ₹{(project.budget.remaining / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-6 backdrop-blur">
              <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Spending Breakdown
              </h2>
              <div className="space-y-3 text-xs md:text-sm">
                {project.budget.categories.map((category, idx) => (
                  <div
                    key={category.name}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            idx === 0
                              ? "bg-blue-500"
                              : idx === 1
                              ? "bg-purple-500"
                              : idx === 2
                              ? "bg-emerald-500"
                              : "bg-orange-500"
                          }`}
                        >
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {category.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {category.percentage}% of total
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-slate-900">
                        ₹{category.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          idx === 0
                            ? "bg-blue-500"
                            : idx === 1
                            ? "bg-purple-500"
                            : idx === 2
                            ? "bg-emerald-500"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === "activity" && (
          <div className="bg-white/95 rounded-2xl shadow-lg border border-slate-200 p-6 backdrop-blur animate-fade-in">
            <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-500" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {project.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-white transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-xs md:text-sm">
                    <p className="font-semibold text-slate-900">
                      {activity.user}{" "}
                      <span className="font-normal text-slate-600">
                        {activity.action}{" "}
                        <span className="text-blue-600">
                          "{activity.target}"
                        </span>
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* If you don't have a fade-in utility, add this in your CSS:
          .animate-fade-in { animation: fadeIn 0.3s ease-out; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
      */}
    </div>
  );
};

export default Report;
