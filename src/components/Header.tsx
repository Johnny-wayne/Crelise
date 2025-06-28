// Header do site: contém logo, menu de navegação e botões de ação (Login, Abra sua Conta ou Sair)
// Estrutura responsiva, com alinhamento: logo à esquerda, menu centralizado, botões à direita

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
    // Header fixo no topo, fundo branco, borda inferior
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Container com largura máxima e padding responsivo */}
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-16">
        {/* Flex para alinhar logo, menu e botões */}
        <div className="flex justify-between items-center h-20">
          {/* Logo à esquerda, simples e marcante */}
          <div className="flex items-center min-w-[220px]">
            <Link to="/" className="text-3xl font-extrabold tracking-tight text-blue-700 select-none">
              CrediAnálise Pro
            </Link>
          </div>
          {/* Menu centralizado, espaçamento generoso */}
          <nav className="hidden md:flex flex-1 justify-center space-x-12">
            <Link to="/" className="text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors">
              Início
            </Link>
            <a href="#sobre" className="text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors">
              Sobre Nós
            </a>
            <a href="#como-funciona" className="text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors">
              Como Funciona
            </a>
          </nav>
          {/* Botões à direita, arredondados e modernos */}
          <div className="flex items-center space-x-4 min-w-[220px] justify-end">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-semibold">Olá, {user.name}</span>
                <Button variant="outline" onClick={onLogout} className="rounded-full border-2 border-blue-500 text-blue-600 bg-white font-bold px-5 py-2 hover:bg-blue-50 hover:text-blue-700 transition">
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" className="rounded-full border-2 border-blue-500 text-blue-600 bg-white font-bold px-5 py-2 hover:bg-blue-50 hover:text-blue-700 transition">
                  Login
                </Button>
                <Button className="rounded-full bg-blue-600 text-white font-bold px-6 py-2 shadow-md hover:bg-blue-700 transition">
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
