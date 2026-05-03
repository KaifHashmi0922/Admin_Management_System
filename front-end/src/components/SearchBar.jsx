import { Search } from "lucide-react"


export default function SearchBar() {
  return (
    <div className="flex-1 max-w-md ml-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects, employees..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100/80 hover:bg-slate-200 backdrop-blur-sm border border-slate-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 focus:bg-white transition-all duration-200 text-sm"
        />
      </div>
    </div>
  )
}
