import { Link } from "react-router-dom";
import { Clock, Shield, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Página inicial do CrediAnálise Pro
 * Exibe informações sobre o serviço de empréstimo pessoal
 * com design moderno e responsivo
 */
const Index = () => {
  return (
    // Container principal com gradiente de fundo azul-violeta
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-violet-200">
      {/* Header com navegação e logo */}
      <Header />
      
      {/* Seção Hero - Apresentação principal do serviço */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-300 via-white to-violet-200 border-b border-gray-100 h-[calc(100vh-20px)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-20">
          {/* Conteúdo centralizado com animação de entrada */}
          <div className="text-center animate-fade-in">
            {/* Título principal com destaque em duas cores */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 tracking-tight">
              Empréstimo Pessoal Rápido,<br />
              <span className="text-violet-700">Justo e Transparente</span>
            </h1>
            {/* Descrição do serviço */}
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Simule seu empréstimo em minutos e receba uma proposta personalizada
              com base na sua análise de crédito inteligente.
            </p>
            {/* Botão CTA principal - leva para o simulador */}
            <Link to="/simulator">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-8 py-4 shadow-md hover:from-blue-700 hover:to-violet-700 transition text-lg">
                Simular Agora
              </Button>
            </Link>
            {/* Seta indicativa para baixo - centralizada perfeitamente abaixo do conteúdo da seção hero */}
            <div className="w-full flex justify-center absolute bottom-24 left-0 z-10 animate-bounce">
              <svg className="w-8 h-8 text-blue-600 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Features - Benefícios do serviço */}
      <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho da seção */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Por que escolher o CrediAnálise Pro?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Nossa tecnologia avançada garante a melhor experiência em empréstimos pessoais
            </p>
          </div>
          
          {/* Grid responsivo com 3 cards de benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Análise Rápida */}
            <Card className="hover:scale-105 transition border-0 shadow-lg rounded-2xl bg-white">
              <CardContent className="p-8 text-center">
                {/* Ícone com fundo azul */}
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">Análise em Minutos</h3>
                <p className="text-gray-700">
                  Nossa IA processa sua solicitação rapidamente,
                  oferecendo uma resposta em tempo real.
                </p>
              </CardContent>
            </Card>
            
            {/* Card 2: Segurança */}
            <Card className="hover:scale-105 transition border-0 shadow-lg rounded-2xl bg-white">
              <CardContent className="p-8 text-center">
                {/* Ícone com fundo violeta */}
                <div className="w-16 h-16 bg-violet-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-violet-700 mb-4">Segurança Total</h3>
                <p className="text-gray-700">
                  Seus dados são protegidos com criptografia de ponta
                  e seguimos os mais altos padrões de segurança.
                </p>
              </CardContent>
            </Card>
            
            {/* Card 3: Taxas Justas */}
            <Card className="hover:scale-105 transition border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-50 via-white to-violet-50">
              <CardContent className="p-8 text-center">
                {/* Ícone com fundo violeta claro */}
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">Taxas Justas</h3>
                <p className="text-gray-700">
                  Oferecemos taxas personalizadas baseadas no seu perfil
                  de crédito, sempre transparentes e justas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção CTA - Call to Action final */}
      <section className="py-32 bg-gradient-to-br from-violet-100 via-blue-50 to-blue-200 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Título motivacional */}
          <h2 className="text-3xl font-bold text-violet-700 mb-6">
            Pronto para dar o próximo passo?
          </h2>
          {/* Descrição do próximo passo */}
          <p className="text-xl text-gray-700 mb-8">
            Faça sua simulação agora e descubra as melhores condições para seu empréstimo
          </p>
          {/* Botões de ação - primário e secundário */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Botão principal - Simulação */}
            <Link to="/simulator">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-8 py-4 shadow-md hover:from-blue-700 hover:to-violet-700 transition">
                Começar Simulação
              </Button>
            </Link>
            {/* Botão secundário - Contato */}
            <Button variant="outline" size="lg" className="rounded-full border-2 border-violet-600 text-violet-700 bg-white font-bold px-8 py-4 hover:bg-violet-50 hover:text-blue-700 transition">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer com informações de contato e links */}
      <Footer />
    </div>
  );
};

export default Index;
