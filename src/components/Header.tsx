
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  user?: {
    name: string;
  };
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                CrediAnálise Pro
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex ml-12 space-x-8">
              <Link to="/" className="text-slate-200 hover:text-white transition-all duration-300 font-medium relative group">
                Início
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <a href="#sobre" className="text-slate-200 hover:text-white transition-all duration-300 font-medium relative group">
                Sobre Nós
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#como-funciona" className="text-slate-200 hover:text-white transition-all duration-300 font-medium relative group">
                Como Funciona
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-white font-medium">Olá, {user.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={onLogout} 
                  className="border-purple-400/50 text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-500/20 backdrop-blur-sm transition-all duration-300"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-purple-400/50 text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-500/20 backdrop-blur-sm transition-all duration-300"
                >
                  Login
                </Button>
                <Button className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 font-semibold px-6">
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
              className="text-white hover:bg-purple-500/20"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-purple-500/20">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-slate-200 hover:text-white transition-colors font-medium px-4 py-2">
                Início
              </Link>
              <a href="#sobre" className="text-slate-200 hover:text-white transition-colors font-medium px-4 py-2">
                Sobre Nós
              </a>
              <a href="#como-funciona" className="text-slate-200 hover:text-white transition-colors font-medium px-4 py-2">
                Como Funciona
              </a>
              
              <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-purple-500/20">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-white font-medium">Olá, {user.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={onLogout} 
                      className="border-purple-400/50 text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-500/20"
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="border-purple-400/50 text-purple-200 hover:text-white hover:border-purple-300 hover:bg-purple-500/20">
                      Login
                    </Button>
                    <Button className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white">
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
