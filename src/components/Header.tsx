
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user?: {
    name: string;
  };
  onLogout?: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              CrediAnálise Pro
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Início
              </Link>
              <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sobre Nós
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-blue-600 transition-colors">
                Como Funciona
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Olá, {user.name}</span>
                <Button variant="outline" onClick={onLogout}>
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline">
                  Login
                </Button>
                <Button>
                  Abra sua Conta
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
