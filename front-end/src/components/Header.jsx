import { Menu, Bell, Search as SearchIcon } from "lucide-react"

export default function DashboardHeader({ onMobileMenuToggle, children }) {
  return (
    <header className="h-16 px-4 lg:px-6 xl:px-8 flex items-center justify-between sticky top-0 z-30 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100/50">
      {/* Left: Breadcrumb + Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button - ALWAYS VISIBLE */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-3 rounded-xl bg-slate-100/50 hover:bg-slate-200 backdrop-blur-sm shadow-md hover:shadow-lg border border-slate-200/50 flex-shrink-0 w-12 h-12 flex items-center justify-center active:scale-95 transition-all duration-200"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>

        {/* Breadcrumb */}
        {/* <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100/60 px-4 py-2 rounded-xl backdrop-blur-sm">
          <span>Dashboard</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-semibold">Overview</span>
        </div> */}
      </div>

      {/* Right: Navbar children */}
      <div className="flex items-center">
        {children}
      </div>
    </header>
  )
}
