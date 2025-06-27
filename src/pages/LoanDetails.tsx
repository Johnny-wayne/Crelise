
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import AnalystSidebar from "@/components/AnalystSidebar";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [justification, setJustification] = useState("");

  // Mock data - in a real app, this would come from an API
  const loan = {
    id: 1,
    customerName: "João Silva",
    cpf: "123.456.789-10",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    birthDate: "1985-05-15",
    profession: "Engenheiro",
    income: 8500,
    hasProperty: true,
    hasVehicle: true,
    monthlyExpenses: 3200,
    amount: 15000,
    installments: 24,
    creditScore: 785,
    aiRecommendation: "approve",
    suggestedRate: 2.1,
    preApprovedLimit: 15000,
  };

  const handleApprove = () => {
    toast({
      title: "Empréstimo Aprovado",
      description: "O empréstimo foi aprovado com sucesso.",
    });
    navigate("/analyst");
  };

  const handleDeny = () => {
    if (!justification.trim()) {
      toast({
        title: "Justificativa Obrigatória",
        description: "Por favor, forneça uma justificativa para a negação.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Empréstimo Negado",
      description: "O empréstimo foi negado com a justificativa fornecida.",
      variant: "destructive",
    });
    navigate("/analyst");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AnalystSidebar />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Detalhes da Solicitação #{id?.padStart(4, '0')}
          </h1>
          <p className="text-gray-600">Análise completa da solicitação de empréstimo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Data */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Nome Completo:</span>
                    <p className="text-gray-800">{loan.customerName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">CPF:</span>
                    <p className="text-gray-800">{loan.cpf}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <p className="text-gray-800">{loan.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Telefone:</span>
                    <p className="text-gray-800">{loan.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Data de Nascimento:</span>
                    <p className="text-gray-800">{new Date(loan.birthDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Profissão:</span>
                    <p className="text-gray-800">{loan.profession}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dados Financeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Renda Mensal:</span>
                    <p className="text-gray-800">R$ {loan.income.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Despesas Mensais:</span>
                    <p className="text-gray-800">R$ {loan.monthlyExpenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Valor Solicitado:</span>
                    <p className="text-gray-800 font-semibold">R$ {loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Parcelas:</span>
                    <p className="text-gray-800">{loan.installments}x</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Possui Imóvel:</span>
                    <p className="text-gray-800">{loan.hasProperty ? "Sim" : "Não"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Possui Veículo:</span>
                    <p className="text-gray-800">{loan.hasVehicle ? "Sim" : "Não"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Analysis & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise do Sistema (IA)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-2">{loan.creditScore}</div>
                  <div className="text-sm text-gray-600 mb-4">Score de Crédito</div>
                  <Progress value={(loan.creditScore / 850) * 100} className="h-3" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Recomendação:</span>
                    <span className={`font-semibold ${
                      loan.aiRecommendation === 'approve' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {loan.aiRecommendation === 'approve' ? 'Aprovar' : 'Negar'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Taxa Sugerida:</span>
                    <span className="font-semibold">{loan.suggestedRate}% a.m.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Limite Pré-aprovado:</span>
                    <span className="font-semibold">R$ {loan.preApprovedLimit.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações do Analista</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">
                    Justificativa (opcional)
                  </label>
                  <Textarea
                    placeholder="Digite sua justificativa aqui..."
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleApprove}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Aprovar Manualmente
                  </Button>
                  <Button
                    onClick={handleDeny}
                    variant="destructive"
                    className="w-full"
                  >
                    Negar Manualmente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
