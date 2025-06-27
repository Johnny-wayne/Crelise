
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

const Simulator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: 10000,
    installments: 12,
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

  const steps = ["Simulação", "Dados Pessoais", "Dados Financeiros", "Revisão"];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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

  const calculateMonthlyPayment = () => {
    const rate = 0.025; // 2.5% a.m.
    const monthlyPayment = (formData.amount * rate) / (1 - Math.pow(1 + rate, -formData.installments));
    return monthlyPayment.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Simulação de Empréstimo</h1>
          <p className="text-gray-600">Preencha os dados para receber sua proposta personalizada</p>
        </div>

        <Stepper currentStep={currentStep} totalSteps={4} steps={steps} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Quanto você precisa?</h2>
                    
                    <div>
                      <Label htmlFor="amount" className="text-lg font-medium">
                        Valor do Empréstimo
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="amount"
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                          className="text-lg"
                        />
                        <Slider
                          value={[formData.amount]}
                          onValueChange={(value) => setFormData({ ...formData, amount: value[0] })}
                          max={100000}
                          min={1000}
                          step={1000}
                          className="mt-4"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>R$ 1.000</span>
                          <span>R$ 100.000</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="installments" className="text-lg font-medium">
                        Número de Parcelas
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="installments"
                          type="number"
                          value={formData.installments}
                          onChange={(e) => setFormData({ ...formData, installments: Number(e.target.value) })}
                          className="text-lg"
                        />
                        <Slider
                          value={[formData.installments]}
                          onValueChange={(value) => setFormData({ ...formData, installments: value[0] })}
                          max={60}
                          min={6}
                          step={1}
                          className="mt-4"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>6x</span>
                          <span>60x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Sobre Você</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={formData.cpf}
                          onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone com DDD</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Sua Vida Financeira</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="profession">Profissão</Label>
                        <Input
                          id="profession"
                          value={formData.profession}
                          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="income">Renda Mensal Bruta (R$)</Label>
                        <Input
                          id="income"
                          type="number"
                          value={formData.income}
                          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="monthlyExpenses">Valor Mensal de Outras Despesas (R$)</Label>
                        <Input
                          id="monthlyExpenses"
                          type="number"
                          value={formData.monthlyExpenses}
                          onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasProperty"
                          checked={formData.hasProperty}
                          onCheckedChange={(checked) => setFormData({ ...formData, hasProperty: checked as boolean })}
                        />
                        <Label htmlFor="hasProperty">Possui imóvel próprio</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasVehicle"
                          checked={formData.hasVehicle}
                          onCheckedChange={(checked) => setFormData({ ...formData, hasVehicle: checked as boolean })}
                        />
                        <Label htmlFor="hasVehicle">Possui veículo</Label>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Revise seus Dados</h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Valor:</span> R$ {formData.amount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Parcelas:</span> {formData.installments}x
                        </div>
                        <div>
                          <span className="font-medium">Nome:</span> {formData.fullName}
                        </div>
                        <div>
                          <span className="font-medium">CPF:</span> {formData.cpf}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {formData.email}
                        </div>
                        <div>
                          <span className="font-medium">Telefone:</span> {formData.phone}
                        </div>
                        <div>
                          <span className="font-medium">Profissão:</span> {formData.profession}
                        </div>
                        <div>
                          <span className="font-medium">Renda:</span> R$ {formData.income}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm">
                        Li e concordo com os Termos de Serviço e a Política de Privacidade
                      </Label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Voltar
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button onClick={handleNext}>
                      Continuar
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={!formData.agreeToTerms}>
                      Enviar Solicitação
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle>Resumo da Simulação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Valor Solicitado:</span>
                    <span className="font-bold">R$ {formData.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parcelas:</span>
                    <span className="font-bold">{formData.installments}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor da Parcela:</span>
                    <span className="font-bold text-green-600">R$ {calculateMonthlyPayment()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa a partir de:</span>
                    <span className="font-bold">2,5% a.m.</span>
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
