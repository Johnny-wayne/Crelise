
import { Link, useLocation } from "react-router-dom";
import { BarChart, Settings } from "lucide-react";

const AnalystSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold">Painel do Analista</h2>
      </div>
      
      <nav className="mt-8">
        <Link
          to="/analyst"
          className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
            isActive("/analyst")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <BarChart className="w-5 h-5 mr-3" />
          Dashboard
        </Link>
        
        <Link
          to="/analyst/settings"
          className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
            isActive("/analyst/settings")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          Configurações
        </Link>
      </nav>
    </div>
  );
};

export default AnalystSidebar;
