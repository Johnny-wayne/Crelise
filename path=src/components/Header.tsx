import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';

const Header = ({ user, onLogout }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:opacity-80 transition">
              CrediAnálise Pro
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex ml-12 space-x-8">
              <Link to="/" className="text-gray-700 hover:text-black transition font-medium">
                Início
              </Link>
              <a href="#sobre" className="text-gray-700 hover:text-black transition font-medium">
                Sobre Nós
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-black transition font-medium">
                Como Funciona
              </a>
            </nav>
          </div>
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-700 text-sm font-bold">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-gray-800 font-medium">Olá, {user.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={onLogout} 
                  className="border-gray-300 text-gray-700 hover:text-black hover:border-gray-400 hover:bg-gray-100 transition"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:text-black hover:border-gray-400 hover:bg-gray-100 transition"
                >
                  Login
                </Button>
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
              <a href="#sobre" className="text-gray-700 hover:text-black font-medium px-4 py-2">
                Sobre Nós
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-black font-medium px-4 py-2">
                Como Funciona
              </a>
              <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-700 text-sm font-bold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-800 font-medium">Olá, {user.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={onLogout} 
                      className="border-gray-300 text-gray-700 hover:text-black hover:border-gray-400 hover:bg-gray-100"
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:text-black hover:border-gray-400 hover:bg-gray-100">
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