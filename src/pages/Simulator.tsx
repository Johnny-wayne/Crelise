import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";

// Tela de Simulação de Empréstimo
// Passos: 1) Simulação, 2) Dados Pessoais, 3) Dados Financeiros, 4) Revisão

// Cada etapa exibe um formulário diferente e o usuário pode navegar entre elas.
// O componente Stepper mostra o progresso dos passos.
// Os valores são controlados por useState e atualizados conforme o usuário interage.
// Os sliders e inputs são estilizados para visual moderno.
// O resumo à direita mostra os dados da simulação em tempo real.
// Botões de navegação controlam o fluxo entre as etapas.
// O envio final exibe um toast de sucesso e redireciona para o dashboard.

const Simulator = () => {
  // Hook de navegação do React Router
  const navigate = useNavigate();
  // Estado para controlar o passo atual do formulário
  const [currentStep, setCurrentStep] = useState(1);
  // Estado para armazenar todos os dados do formulário
  const [formData, setFormData] = useState({
    amount: 10000, // Valor do empréstimo
    installments: 12, // Número de parcelas
    fullName: "",
    cpf: "",
    email: "",
    phone: "",
    birthDate: "",
    profession: "",
    income: "",
    hasProperty: false,
    hasVehicle: false,
    monthlyExpenses: "",
    agreeToTerms: false,
  });

  // Nomes dos passos para o Stepper
  const steps = ["Simulação", "Dados Pessoais", "Dados Financeiros", "Revisão"];

  // Avança para o próximo passo
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Volta para o passo anterior
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Envia a solicitação final
  const handleSubmit = () => {
    if (!formData.agreeToTerms) {
      toast({
        title: "Erro",
        description: "Você deve concordar com os termos para continuar.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Solicitação enviada!",
      description: "Sua solicitação foi enviada com sucesso. Você será redirecionado para o dashboard.",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  // Calcula o valor da parcela com base no valor e número de parcelas
  const calculateMonthlyPayment = () => {
    const rate = 0.025; // 2.5% a.m.
    const monthlyPayment = (formData.amount * rate) / (1 - Math.pow(1 + rate, -formData.installments));
    return monthlyPayment.toFixed(2);
  };

  return (
    // Container principal com gradiente de fundo
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
        <div className="text-center mb-10">
          {/* Título e subtítulo da tela */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-3 drop-shadow-sm">Simulação de Empréstimo</h1>
          <p className="text-lg text-gray-600">Preencha os dados para receber sua proposta personalizada</p>
        </div>
        {/* Stepper de progresso dos passos */}
        <Stepper currentStep={currentStep} totalSteps={4} steps={steps} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
          {/* Coluna principal com o formulário dinâmico */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-2xl">
              <CardContent className="p-10">
                {/* Passo 1: Simulação do valor e parcelas */}
                {currentStep === 1 && (
                  <div className="space-y-10">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Quanto você precisa?</h2>
                    {/* Input e slider para valor do empréstimo */}
                    <div>
                      <Label htmlFor="amount" className="text-lg font-semibold text-blue-700">Valor do Empréstimo</Label>
                      <div className="mt-3">
                        <Input
                          id="amount"
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                          className="text-lg bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                        <Slider
                          value={[formData.amount]}
                          onValueChange={(value) => setFormData({ ...formData, amount: value[0] })}
                          max={100000}
                          min={1000}
                          step={1000}
                          className="mt-4"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                          <span>R$ 1.000</span>
                          <span>R$ 100.000</span>
                        </div>
                      </div>
                    </div>
                    {/* Input e slider para número de parcelas */}
                    <div>
                      <Label htmlFor="installments" className="text-lg font-semibold text-blue-700">Número de Parcelas</Label>
                      <div className="mt-3">
                        <Input
                          id="installments"
                          type="number"
                          value={formData.installments}
                          onChange={(e) => setFormData({ ...formData, installments: Number(e.target.value) })}
                          className="text-lg bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                        <Slider
                          value={[formData.installments]}
                          onValueChange={(value) => setFormData({ ...formData, installments: value[0] })}
                          max={60}
                          min={6}
                          step={1}
                          className="mt-4"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                          <span>6x</span>
                          <span>60x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Passo 2: Dados pessoais do usuário */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Sobre Você</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Inputs para nome, CPF, email, telefone, data de nascimento */}
                      <div>
                        <Label htmlFor="fullName" className="text-blue-700">Nome Completo</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf" className="text-blue-700">CPF</Label>
                        <Input
                          id="cpf"
                          value={formData.cpf}
                          onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                          className="bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-blue-700">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-blue-700">Telefone com DDD</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="birthDate" className="text-blue-700">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                          className="bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Passo 3: Dados financeiros do usuário */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Sua Vida Financeira</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Inputs para profissão, renda, despesas, imóveis, veículos */}
                      <div>
                        <Label htmlFor="profession" className="text-blue-700">Profissão</Label>
                        <Input
                          id="profession"
                          value={formData.profession}
                          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                          className="bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="income" className="text-blue-700">Renda Mensal Bruta (R$)</Label>
                        <Input
                          id="income"
                          type="number"
                          value={formData.income}
                          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                          className="bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="monthlyExpenses" className="text-blue-700">Valor Mensal de Outras Despesas (R$)</Label>
                        <Input
                          id="monthlyExpenses"
                          type="number"
                          value={formData.monthlyExpenses}
                          onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
                          className="bg-white border-2 border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {/* Checkboxes para imóvel e veículo */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasProperty"
                          checked={formData.hasProperty}
                          onCheckedChange={(checked) => setFormData({ ...formData, hasProperty: checked as boolean })}
                        />
                        <Label htmlFor="hasProperty" className="text-blue-700">Possui imóvel próprio</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasVehicle"
                          checked={formData.hasVehicle}
                          onCheckedChange={(checked) => setFormData({ ...formData, hasVehicle: checked as boolean })}
                        />
                        <Label htmlFor="hasVehicle" className="text-blue-700">Possui veículo</Label>
                      </div>
                    </div>
                  </div>
                )}
                {/* Passo 4: Revisão dos dados antes do envio */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Revise seus Dados</h2>
                    <div className="space-y-4">
                      {/* Exibe todos os dados preenchidos para conferência */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-blue-700">Valor:</span> <span className="text-gray-700">R$ {formData.amount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Parcelas:</span> <span className="text-gray-700">{formData.installments}x</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Nome:</span> <span className="text-gray-700">{formData.fullName}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">CPF:</span> <span className="text-gray-700">{formData.cpf}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Email:</span> <span className="text-gray-700">{formData.email}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Telefone:</span> <span className="text-gray-700">{formData.phone}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Profissão:</span> <span className="text-gray-700">{formData.profession}</span>
                        </div>
                        <div>
                          <span className="font-medium text-blue-700">Renda:</span> <span className="text-gray-700">R$ {formData.income}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm text-blue-700">
                        Li e concordo com os Termos de Serviço e a Política de Privacidade
                      </Label>
                    </div>
                  </div>
                )}
                {/* Botões de navegação entre os passos */}
                <div className="flex justify-between mt-10 gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="bg-gray-100 text-blue-700 border-2 border-blue-200 hover:bg-blue-50 hover:border-pink-400 hover:text-pink-500 transition shadow"
                  >
                    Voltar
                  </Button>
                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold shadow-lg hover:from-blue-700 hover:to-pink-600 transition"
                    >
                      Continuar
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.agreeToTerms}
                      className="bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold shadow-lg hover:from-blue-700 hover:to-pink-600 transition"
                    >
                      Enviar Solicitação
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Coluna lateral com o resumo da simulação */}
          <div>
            <Card className="shadow-2xl sticky top-8 border-0 bg-white/90 backdrop-blur-md rounded-2xl">
              <CardHeader>
                <CardTitle className="text-blue-800">Resumo da Simulação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Exibe os dados principais da simulação em tempo real */}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor Solicitado:</span>
                    <span className="font-bold text-blue-700">R$ {formData.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parcelas:</span>
                    <span className="font-bold text-blue-700">{formData.installments}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor da Parcela:</span>
                    <span className="font-bold text-pink-500">R$ {calculateMonthlyPayment()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa a partir de:</span>
                    <span className="font-bold text-blue-700">2,5% a.m.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
