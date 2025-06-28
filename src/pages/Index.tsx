import { Link } from "react-router-dom";
import { Clock, Shield, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Empréstimo Pessoal Rápido,
                <br />
                <span className="text-blue-200">Justo e Transparente</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Simule seu empréstimo em minutos e receba uma proposta personalizada 
                com base na sua análise de crédito inteligente.
              </p>
              <Link to="/simulator">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 hover-scale">
                  Simular Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Por que escolher o CrediAnálise Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa tecnologia avançada garante a melhor experiência em empréstimos pessoais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-scale border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">Análise em Minutos</h3>
                <p className="text-blue-700">
                  Nossa IA processa sua solicitação rapidamente, 
                  oferecendo uma resposta em tempo real.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-violet-700 mb-4">Segurança Total</h3>
                <p className="text-violet-700">
                  Seus dados são protegidos com criptografia de ponta 
                  e seguimos os mais altos padrões de segurança.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">Taxas Justas</h3>
                <p className="text-blue-700">
                  Oferecemos taxas personalizadas baseadas no seu perfil 
                  de crédito, sempre transparentes e justas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Pronto para dar o próximo passo?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Faça sua simulação agora e descubra as melhores condições para seu empréstimo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulator">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold shadow-lg hover:from-blue-700 hover:to-pink-600 transition">
                Começar Simulação
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white text-blue-600 border-2 border-blue-400 hover:bg-blue-50 hover:text-pink-500 hover:border-pink-400 transition font-bold">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
