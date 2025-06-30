import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  user?: {
    name: string;
  };
  onLogout?: () => void;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      setCurrentUser(null);
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-1 items-center justify-start">
            <Link to="/" className="text-2xl font-bold text-blue-700 font-michroma tracking-wide hover:opacity-80 transition">
              Crelise
            </Link>
          </div>
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <nav className="flex space-x-14 mr-8">
              <Link to="/" className="text-gray-700 hover:text-black transition font-medium">
                Início
              </Link>
              <Link to="/sobre" className="text-gray-700 hover:text-black transition font-medium">
                Sobre Nós
              </Link>
              <a href="#como-funciona" className="text-gray-700 hover:text-black transition font-medium">
                Como Funciona
              </a>
            </nav>
          </div>
          <div className="hidden lg:flex flex-1 items-center justify-end space-x-4">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 transition focus:outline-none">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 text-sm font-bold">
                        {currentUser.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium">Olá, {currentUser.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => window.location.href = '/configuracoes'}>
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                    Minhas análises
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { localStorage.removeItem('currentUser'); window.location.reload(); }} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl">
                    Login
                  </Button>
                </Link>
                <Button className="bg-gray-900 text-white hover:bg-gray-800 transition font-semibold px-6">
                  Abra sua Conta
                </Button>
              </>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-black font-medium px-4 py-2">
                Início
              </Link>
              <Link to="/sobre" className="text-gray-700 hover:text-black font-medium px-4 py-2">
                Sobre Nós
              </Link>
              <a href="#como-funciona" className="text-gray-700 hover:text-black font-medium px-4 py-2">
                Como Funciona
              </a>
              <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-200">
                {currentUser ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-700 text-sm font-bold">
                          {currentUser.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-800 font-medium">Olá, {currentUser.name}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:text-black hover:border-gray-400 hover:bg-gray-100">
                      Login
                    </Button>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl">
                      Login
                    </Button>
                    <Button className="bg-gray-900 text-white hover:bg-gray-800">
                      Abra sua Conta
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
