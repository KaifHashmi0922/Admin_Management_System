import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../../components/SideBar"
import DashboardHeader from "../../components/Header"
import Navbar from "../../components/Navbar"
import { roleDashboard } from "../../config/roleConfig"
import { useAuth } from "../../context/AuthContext"
import { useLayout } from "../../api/hooks/Layout/useLayout"

export default function DashboardLayout() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const {data,loading,logout}=useLayout();

  
  const { user } = useAuth()

  const RoleDashboard = roleDashboard[user?.role] || roleDashboard["guest"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 
                    grid grid-cols-1 lg:grid-cols-[auto_1fr] 
                    lg:grid-rows-[auto_1fr] 
                    grid-rows-[auto_1fr_auto_1fr] 
                    h-screen overflow-hidden">

      {/* SIDEBAR */}
      <aside className={`
        row-span-1 lg:row-span-2 lg:col-span-1 border-r border-slate-200/50 
        bg-white/80 backdrop-blur-xl z-50 transition-all duration-500
        ${sidebarHidden ? 'w-16 lg:w-16' : 'w-full lg:w-72'}
      `}>
        <Sidebar   
          UserRole={data?.role.toLowerCase()}
          isMobileMenuOpen={mobileMenuOpen} 
          onMobileMenuClose={() => setMobileMenuOpen(false)}
          isHidden={sidebarHidden}
          onToggleHide={() => setSidebarHidden(!sidebarHidden)}
          logout={logout}
          data={data}
        />
      </aside>

      {/* HEADER */}
      <header className="col-span-1 lg:col-start-2 border-b border-slate-200/50 
                         bg-white/95 backdrop-blur-xl shadow-sm z-40 sticky top-0">
        <DashboardHeader onMobileMenuToggle={() => setMobileMenuOpen(true)}>
          <div className="flex items-center gap-4 justify-end pr-4 lg:pr-6">
            <Navbar />
          </div>
        </DashboardHeader>
      </header>

      {/* MAIN */}
      <main className="col-span-1 lg:col-start-2 overflow-y-auto bg-gradient-to-br 
                      from-slate-50/50 via-white/80 to-indigo-50/50 backdrop-blur-xl">

        <div className="h-full p-4 sm:p-6 lg:p-8 xl:p-12 space-y-8 max-w-7xl mx-auto">

          {/* Role Dashboard */}
          {RoleDashboard && <RoleDashboard />}

          {/* Nested Routes */}
          <Outlet />

        </div>

      </main>
    </div>
  )
}