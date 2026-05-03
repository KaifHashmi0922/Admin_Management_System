// TeamReport.jsx
import React, { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Briefcase,
  Activity,
  Search,
  Filter,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  BarChart3,
} from "lucide-react";

// Mock team data (replace later with API data)
const mockTeam = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "Senior Developer",
    department: "Engineering",
    email: "amit.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Delhi, IN",
    status: "Active",
    avatar: "AS",
    tasksCompleted: 42,
    tasksPending: 5,
    productivity: 92,
    hoursThisWeek: 38,
    lastActive: "2h ago",
  },
  {
    id: 2,
    name: "Neha Verma",
    role: "UI/UX Designer",
    department: "Design",
    email: "neha.verma@example.com",
    phone: "+91 99887 76655",
    location: "Remote",
    status: "Active",
    avatar: "NV",
    tasksCompleted: 30,
    tasksPending: 8,
    productivity: 85,
    hoursThisWeek: 34,
    lastActive: "15m ago",
  },
  {
    id: 3,
    name: "Rohit Singh",
    role: "QA Engineer",
    department: "Quality",
    email: "rohit.singh@example.com",
    phone: "+91 90123 45678",
    location: "Noida, IN",
    status: "On Leave",
    avatar: "RS",
    tasksCompleted: 21,
    tasksPending: 3,
    productivity: 78,
    hoursThisWeek: 12,
    lastActive: "1d ago",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Project Manager",
    department: "Management",
    email: "priya.patel@example.com",
    phone: "+91 91234 56780",
    location: "Gurgaon, IN",
    status: "Active",
    avatar: "PP",
    tasksCompleted: 55,
    tasksPending: 2,
    productivity: 96,
    hoursThisWeek: 41,
    lastActive: "5m ago",
  },
  {
    id: 5,
    name: "Aditya Rao",
    role: "Backend Developer",
    department: "Engineering",
    email: "aditya.rao@example.com",
    phone: "+91 98765 12345",
    location: "Remote",
    status: "Inactive",
    avatar: "AR",
    tasksCompleted: 10,
    tasksPending: 15,
    productivity: 50,
    hoursThisWeek: 8,
    lastActive: "5d ago",
  },
];

const statusColors = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "On Leave": "bg-amber-100 text-amber-700 border-amber-200",
  Inactive: "bg-rose-100 text-rose-700 border-rose-200",
};

const productivityColor = (value) => {
  if (value >= 90) return "bg-emerald-500";
  if (value >= 75) return "bg-amber-500";
  return "bg-rose-500";
};

export default function TeamReport() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState(null);

  const stats = useMemo(() => {
    const total = mockTeam.length;
    const active = mockTeam.filter((m) => m.status === "Active").length;
    const onLeave = mockTeam.filter((m) => m.status === "On Leave").length;
    const inactive = mockTeam.filter((m) => m.status === "Inactive").length;
    const avgProductivity =
      Math.round(
        mockTeam.reduce((sum, m) => sum + m.productivity, 0) / total
      ) || 0;
    const totalTasksCompleted = mockTeam.reduce(
      (sum, m) => sum + m.tasksCompleted,
      0
    );
    return {
      total,
      active,
      onLeave,
      inactive,
      avgProductivity,
      totalTasksCompleted,
    };
  }, []);

  const departments = useMemo(() => {
    const set = new Set(mockTeam.map((m) => m.department));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredTeam = useMemo(() => {
    return mockTeam.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.role.toLowerCase().includes(search.toLowerCase()) ||
        member.department.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;
      const matchesDepartment =
        departmentFilter === "All" || member.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [search, statusFilter, departmentFilter]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Page header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
              Team Reports
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Team Performance Overview
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Monitor team status, productivity, and workload in real time.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              Export Report
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition">
              <Users className="w-4 h-4" />
              Add Member
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Top stats */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 flex items-center gap-4">
              <div className="rounded-2xl bg-indigo-50 p-3">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  Total Members
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 flex items-center gap-4">
              <div className="rounded-2xl bg-emerald-50 p-3">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  Active Members
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.active}
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 flex items-center gap-4">
              <div className="rounded-2xl bg-amber-50 p-3">
                <Activity className="w-6 h-6 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  Avg. Productivity
                </p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-slate-900">
                    {stats.avgProductivity}
                  </p>
                  <span className="text-xs text-slate-500">/ 100</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 flex items-center gap-4">
              <div className="rounded-2xl bg-sky-50 p-3">
                <Briefcase className="w-6 h-6 text-sky-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  Tasks Completed
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats.totalTasksCompleted}
                </p>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, role, department..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-white transition"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-700">
                <Filter className="w-4 h-4 text-slate-400" />
                Filters
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                <option value="All">All status</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep === "All" ? "All departments" : dep}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Main layout */}
          <section className="grid gap-6 lg:grid-cols-3">
            {/* Team cards */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">
                  Team members
                </h2>
                <p className="text-xs text-slate-500">
                  Showing {filteredTeam.length} of {mockTeam.length}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {filteredTeam.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`group text-left rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      selectedMember?.id === member.id
                        ? "border-indigo-300 ring-2 ring-indigo-100"
                        : "border-slate-100"
                    }`}
                  >
                    <div className="p-4 flex gap-3">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-sm font-bold text-white shadow-sm">
                          {member.avatar}
                        </div>
                        <span
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                            member.status === "Active"
                              ? "bg-emerald-500"
                              : member.status === "On Leave"
                              ? "bg-amber-400"
                              : "bg-rose-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {member.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {member.role} • {member.department}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusColors[member.status]}`}
                          >
                            {member.status}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          {/* Productivity bar */}
                          <div>
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                              <span>Productivity</span>
                              <span>{member.productivity}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full ${productivityColor(
                                  member.productivity
                                )} transition-all`}
                                style={{ width: `${member.productivity}%` }}
                              />
                            </div>
                          </div>

                          {/* Tasks and hours */}
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3 text-emerald-500" />
                              {member.tasksCompleted} done •{" "}
                              {member.tasksPending} pending
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-sky-500" />
                              {member.hoursThisWeek}h / week
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-4 pb-3 pt-2 border-t border-slate-50 bg-slate-50/60 rounded-b-2xl">
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {member.location}
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Last active {member.lastActive}
                      </p>
                    </div>
                  </button>
                ))}

                {filteredTeam.length === 0 && (
                  <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-6 text-center">
                    <p className="text-sm font-medium text-slate-700">
                      No team members match your filters.
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try clearing filters or searching with a different keyword.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Detail side panel */}
            <aside className="space-y-3">
              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Member details
                  </h2>
                  <button className="inline-flex items-center gap-1 text-[11px] text-indigo-600 font-medium hover:text-indigo-700">
                    View full report
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                {selectedMember ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-sm font-bold text-white shadow-sm">
                          {selectedMember.avatar}
                        </div>
                        <span
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                            selectedMember.status === "Active"
                              ? "bg-emerald-500"
                              : selectedMember.status === "On Leave"
                              ? "bg-amber-400"
                              : "bg-rose-400"
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedMember.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {selectedMember.role} •{" "}
                          {selectedMember.department}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusColors[selectedMember.status]}`}
                          >
                            {selectedMember.status}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                            <Briefcase className="w-3 h-3 mr-1" />
                            Core team
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-xl bg-slate-50/80 p-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Productivity</span>
                        <span className="font-semibold text-slate-800">
                          {selectedMember.productivity} / 100
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full ${productivityColor(
                            selectedMember.productivity
                          )}`}
                          style={{
                            width: `${selectedMember.productivity}%`,
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-2 text-[11px]">
                        <div className="rounded-lg bg-white border border-slate-100 p-2">
                          <p className="text-slate-500">Completed</p>
                          <p className="font-semibold text-slate-900">
                            {selectedMember.tasksCompleted}
                          </p>
                        </div>
                        <div className="rounded-lg bg-white border border-slate-100 p-2">
                          <p className="text-slate-500">Pending</p>
                          <p className="font-semibold text-slate-900">
                            {selectedMember.tasksPending}
                          </p>
                        </div>
                        <div className="rounded-lg bg-white border border-slate-100 p-2">
                          <p className="text-slate-500">Hours / week</p>
                          <p className="font-semibold text-slate-900">
                            {selectedMember.hoursThisWeek}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="truncate">
                          {selectedMember.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{selectedMember.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{selectedMember.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Last active {selectedMember.lastActive}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 rounded-xl bg-indigo-600 text-white text-xs font-semibold py-2 hover:bg-indigo-700 transition">
                        View detailed report
                      </button>
                      <button className="flex-1 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 py-2 hover:bg-slate-50 transition">
                        Send message
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 px-4">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-800">
                      Select a member to view details
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Click on any team card on the left to see a full
                      breakdown of their performance and contact info.
                    </p>
                  </div>
                )}
              </div>

              {/* Summary box */}
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 text-white p-4 shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  Today&apos;s snapshot
                </p>
                <p className="mt-1 text-sm">
                  {stats.active} active members are contributing to{" "}
                  {stats.totalTasksCompleted}+ completed tasks, with an
                  average productivity of {stats.avgProductivity}% this
                  week.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full bg-white/10 px-2 py-0.5">
                    Active: {stats.active}
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5">
                    On leave: {stats.onLeave}
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5">
                    Inactive: {stats.inactive}
                  </span>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}
