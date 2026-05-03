import { 
  Users, Briefcase, CheckCircle, TrendingUp, DollarSign, Activity, Clock, Award 
} from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardHome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Mock data - replace with your useAnalytics hook later
  const projects = 127
  const employees = 45
  const revenue = projects * 850 + employees * 1200
  const tasks = 342

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent -skew-x-12 -translate-x-8 h-64"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
            <span className="text-blue-100 text-sm font-medium tracking-wide">Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-3 drop-shadow-lg">
            Welcome Back<span className="text-blue-200"> 👋</span>
          </h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl">
            Here's what's happening with your business today. Everything looks great!
          </p>
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center gap-2 text-blue-100 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
              <Activity size={20} />
              <span>Live Data</span>
            </div>
            <div className="text-lg font-bold bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Premium KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard
          title="Total Revenue"
          value={`₹${revenue.toLocaleString()}`}
          trend="+12.4%"
          changeType="up"
          icon={<DollarSign size={24} />}
          color="from-emerald-500 via-emerald-600 to-teal-600"
        />
        <KpiCard
          title="Employees"
          value={employees.toLocaleString()}
          trend="+3%"
          changeType="up"
          icon={<Users size={24} />}
          color="from-blue-500 via-blue-600 to-indigo-600"
        />
        <KpiCard
          title="Projects"
          value={projects.toLocaleString()}
          trend="+8.2%"
          changeType="up"
          icon={<Briefcase size={24} />}
          color="from-orange-500 via-orange-600 to-red-500"
        />
        <KpiCard
          title="Tasks"
          value={tasks.toLocaleString()}
          trend="-2%"
          changeType="down"
          icon={<CheckCircle size={24} />}
          color="from-purple-500 via-purple-600 to-pink-600"
        />
      </div>

      {/* Advanced Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProjectGrowth projects={projects} />
        <EmployeePerformance employees={employees} />
        <RevenueBreakdown revenue={revenue} />
      </div>

      <QuickStatsEnhanced projects={projects} employees={employees} tasks={tasks} revenue={revenue} />
    </div>
  )
}

// ==================== ALL SUB-COMPONENTS ====================

function KpiCard({ title, value, trend, changeType, icon, color }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${color} text-white hover:-translate-y-2`}>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_80%,white_0%,transparent_50%)]"></div>
      </div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="bg-white/20 backdrop-blur-xl p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className={`text-sm font-semibold px-3 py-1 rounded-xl bg-white/20 backdrop-blur-sm flex items-center gap-1 ${
            changeType === 'up' ? 'text-emerald-200' : 'text-rose-200'
          }`}>
            <TrendIcon changeType={changeType} />
            <span>{trend}</span>
          </div>
        </div>
        <p className="text-blue-100 font-medium text-sm uppercase tracking-wide mb-2 opacity-80">{title}</p>
        <p className="text-4xl md:text-3xl lg:text-4xl font-black leading-none drop-shadow-lg">{value}</p>
      </div>
      <div className="absolute bottom-4 right-4 w-20 h-6 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}

function TrendIcon({ changeType }) {
  return changeType === 'up' ? (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function ProjectGrowth({ projects }) {
  return (
    <div className="lg:col-span-1 p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-3 h-12 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-2xl shadow-lg"></div>
        <div>
          <h3 className="text-xl font-bold text-emerald-900">Project Growth</h3>
          <p className="text-emerald-600 text-sm font-medium">This month</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="text-4xl font-black text-emerald-600">{projects}</div>
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100/80 px-4 py-2 rounded-2xl font-semibold">
          <TrendingUp size={18} />
          +18% from last month
        </div>
      </div>
    </div>
  )
}

function EmployeePerformance({ employees }) {
  return (
    <div className="lg:col-span-1 p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl shadow-lg"></div>
        <div>
          <h3 className="text-xl font-bold text-blue-900">Team Performance</h3>
          <p className="text-blue-600 text-sm font-medium">Active Today</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="text-4xl font-black text-blue-600">{employees}</div>
        <div className="w-full bg-blue-100/60 rounded-2xl h-3 shadow-inner">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-2xl shadow-lg" style={{width: '89%'}}></div>
        </div>
      </div>
    </div>
  )
}

function RevenueBreakdown({ revenue }) {
  return (
    <div className="lg:col-span-1 p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-3 h-12 bg-gradient-to-b from-purple-500 to-purple-600 rounded-2xl shadow-lg"></div>
        <div>
          <h3 className="text-xl font-bold text-purple-900">Revenue Source</h3>
          <p className="text-purple-600 text-sm font-medium">Breakdown</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-3xl font-black text-purple-600 mb-4">{revenue.toLocaleString()}</div>
        <div className="space-y-2 text-sm">
          <RevenueRow label="Projects" value="67%" color="from-purple-500" />
          <RevenueRow label="Consulting" value="23%" color="from-blue-500" />
          <RevenueRow label="Support" value="10%" color="from-emerald-500" />
        </div>
      </div>
    </div>
  )
}

function RevenueRow({ label, value, color }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-transparent shadow-sm"></div>
      <span className="font-medium text-gray-700 flex-1">{label}</span>
      <span className="font-bold text-purple-700">{value}</span>
    </div>
  )
}

function QuickStatsEnhanced({ projects, employees, tasks, revenue }) {
  const stats = [
    { label: "Project Success Rate", value: "94%", icon: Award, color: "text-emerald-600" },
    { label: "Avg. Task Time", value: "2.3h", icon: Clock, color: "text-blue-600" },
    { label: "Employee Satisfaction", value: "98%", icon: Users, color: "text-purple-600" }
  ]

  return (
    <div className="bg-gradient-to-br from-slate-50/80 via-white to-blue-50/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200/50">
        <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-xl shadow-lg"></div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Quick Metrics</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatMetric key={index} {...stat} />
        ))}
      </div>
    </div>
  )
}

function StatMetric({ label, value, icon: Icon, color }) {
  return (
    <div className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl hover:-translate-y-1 border border-slate-100/50 transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-r ${color} from-${color.replace('text-', '')}/20 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
          <Icon size={24} className={`${color} shadow-md`} />
        </div>
      </div>
      <p className="text-3xl font-black text-slate-900 mb-1 group-hover:text-slate-950">{value}</p>
      <p className="text-sm text-slate-600 font-medium tracking-wide">{label}</p>
    </div>
  )
}
