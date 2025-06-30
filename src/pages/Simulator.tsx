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
import ValidatedInput from "@/components/ValidatedInput";
import { 
  validateStep, 
  formatCPF, 
  formatPhone, 
  formatCurrency,
  validateField,
  type CompleteFormData 
} from "@/lib/validation";
import { cn } from "@/lib/utils";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<CompleteFormData>({
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

  // Função para validar o passo atual
  const validateCurrentStep = () => {
    const stepData = getStepData(currentStep);
    const validation = validateStep(currentStep, stepData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  // Função para obter dados do passo atual
  const getStepData = (step: number) => {
    switch (step) {
      case 1:
        return { amount: formData.amount, installments: formData.installments };
      case 2:
        return {
          fullName: formData.fullName,
          cpf: formData.cpf,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
        };
      case 3:
        return {
          profession: formData.profession,
          income: formData.income,
          monthlyExpenses: formData.monthlyExpenses,
          hasProperty: formData.hasProperty,
          hasVehicle: formData.hasVehicle,
        };
      case 4:
        return { agreeToTerms: formData.agreeToTerms };
      default:
        return {};
    }
  };

  // Avança para o próximo passo
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: "Erro de Validação",
        description: "Por favor, corrija os campos obrigatórios antes de continuar.",
        variant: "destructive",
      });
    }
  };

  // Volta para o passo anterior
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  // Função "IA" simples para análise de empréstimo
  function analisarEmprestimo({ income, monthlyExpenses, amount }) {
    const renda = Number(income) || 0;
    const despesas = Number(monthlyExpenses) || 0;
    if (renda - despesas > amount / 10) {
      return 'approved';
    }
    if (renda - despesas > amount / 20) {
      return 'analyzing';
    }
    return 'denied';
  }

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

    // Validação final completa
    const validation = validateStep(4, { agreeToTerms: formData.agreeToTerms });
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast({
        title: "Erro de Validação",
        description: "Por favor, corrija os campos obrigatórios antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    // Salvar empréstimo no localStorage
    const status = analisarEmprestimo({
      income: formData.income,
      monthlyExpenses: formData.monthlyExpenses,
      amount: formData.amount,
    });
    const newLoan = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      amount: formData.amount,
      installments: formData.installments,
      status,
    };
    const existingLoans = JSON.parse(localStorage.getItem("loans") || "[]");
    localStorage.setItem("loans", JSON.stringify([newLoan, ...existingLoans]));

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
                      <Label htmlFor="amount" className="text-lg font-semibold text-blue-700">
                        Valor do Empréstimo *
                      </Label>
                      <div className="mt-3">
                        <Input
                          id="amount"
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                          className={cn(
                            "text-lg bg-white border-2 transition shadow-sm",
                            errors.amount 
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                              : "border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
                          )}
                          min={1000}
                          max={100000}
                          step={1000}
                        />
                        {errors.amount && (
                          <p className="text-sm text-red-500 font-medium mt-1">{errors.amount}</p>
                        )}
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
                      <Label htmlFor="installments" className="text-lg font-semibold text-blue-700">
                        Número de Parcelas *
                      </Label>
                      <div className="mt-3">
                        <Input
                          id="installments"
                          type="number"
                          value={formData.installments}
                          onChange={(e) => setFormData({ ...formData, installments: Number(e.target.value) })}
                          className={cn(
                            "text-lg bg-white border-2 transition shadow-sm",
                            errors.installments 
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                              : "border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
                          )}
                          min={6}
                          max={60}
                          step={1}
                        />
                        {errors.installments && (
                          <p className="text-sm text-red-500 font-medium mt-1">{errors.installments}</p>
                        )}
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
                      <ValidatedInput
                        id="fullName"
                        label="Nome Completo"
                        value={formData.fullName}
                        onChange={(value) => setFormData({ ...formData, fullName: value })}
                        error={errors.fullName}
                        required
                        placeholder="Digite seu nome completo"
                        validateOnChange={true}
                        validationFn={validateField.fullName}
                      />
                      <ValidatedInput
                        id="cpf"
                        label="CPF"
                        value={formData.cpf}
                        onChange={(value) => setFormData({ ...formData, cpf: value })}
                        error={errors.cpf}
                        required
                        placeholder="000.000.000-00"
                        formatValue={formatCPF}
                        maxLength={14}
                        validateOnChange={true}
                        validationFn={validateField.cpf}
                      />
                      <ValidatedInput
                        id="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(value) => setFormData({ ...formData, email: value })}
                        error={errors.email}
                        required
                        placeholder="seu@email.com"
                        validateOnChange={true}
                        validationFn={validateField.email}
                      />
                      <ValidatedInput
                        id="phone"
                        label="Telefone com DDD"
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value })}
                        error={errors.phone}
                        required
                        placeholder="(00) 00000-0000"
                        formatValue={formatPhone}
                        maxLength={15}
                        validateOnChange={true}
                        validationFn={validateField.phone}
                      />
                      <div className="md:col-span-2">
                        <ValidatedInput
                          id="birthDate"
                          label="Data de Nascimento"
                          type="date"
                          value={formData.birthDate}
                          onChange={(value) => setFormData({ ...formData, birthDate: value })}
                          error={errors.birthDate}
                          required
                          validateOnChange={true}
                          validationFn={validateField.birthDate}
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
                      <ValidatedInput
                        id="profession"
                        label="Profissão"
                        value={formData.profession}
                        onChange={(value) => setFormData({ ...formData, profession: value })}
                        error={errors.profession}
                        required
                        placeholder="Digite sua profissão"
                        validateOnChange={true}
                        validationFn={validateField.profession}
                      />
                      <ValidatedInput
                        id="income"
                        label="Renda Mensal Bruta (R$)"
                        value={formData.income}
                        onChange={(value) => setFormData({ ...formData, income: value })}
                        error={errors.income}
                        required
                        placeholder="0,00"
                        type="number"
                        min={1000}
                        validateOnChange={true}
                        validationFn={validateField.income}
                      />
                      <div className="md:col-span-2">
                        <ValidatedInput
                          id="monthlyExpenses"
                          label="Valor Mensal de Outras Despesas (R$)"
                          value={formData.monthlyExpenses}
                          onChange={(value) => setFormData({ ...formData, monthlyExpenses: value })}
                          error={errors.monthlyExpenses}
                          required
                          placeholder="0,00"
                          type="number"
                          min={0}
                          validateOnChange={true}
                          validationFn={validateField.monthlyExpenses}
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
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm text-blue-700">
                          Li e concordo com os Termos de Serviço e a Política de Privacidade *
                        </Label>
                      </div>
                      {errors.agreeToTerms && (
                        <p className="text-sm text-red-500 font-medium">{errors.agreeToTerms}</p>
                      )}
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
