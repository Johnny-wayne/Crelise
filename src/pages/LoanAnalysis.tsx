import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Função de dicas/explicações baseada na lógica de IA simples
function gerarDicas(loan: any) {
  if (!loan) return [];
  const dicas = [];
  if (loan.status === "denied") {
    dicas.push("Sua solicitação foi negada. Considere reduzir o valor solicitado ou aumentar sua renda declarada.");
    dicas.push("Verifique se suas despesas mensais estão muito altas em relação à sua renda.");
  } else if (loan.status === "analyzing") {
    dicas.push("Sua solicitação está em análise. Mantenha seus dados atualizados e aguarde o retorno.");
    dicas.push("Se possível, envie comprovantes de renda para agilizar a análise.");
  } else if (loan.status === "approved") {
    dicas.push("Parabéns! Seu empréstimo foi aprovado.");
    dicas.push("Mantenha suas finanças organizadas para pagar as parcelas em dia.");
  } else {
    dicas.push("Status desconhecido. Entre em contato com o suporte para mais informações.");
  }
  return dicas;
}

const LoanAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<any>(null);

  useEffect(() => {
    const loans = JSON.parse(localStorage.getItem("loans") || "[]");
    const found = loans.find((l: any) => String(l.id) === String(id));
    setLoan(found);
  }, [id]);

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-white to-blue-200">
        <Card className="p-8">
          <CardHeader>
            <CardTitle>Solicitação não encontrada</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate(-1)} className="mt-4">Voltar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dicas = gerarDicas(loan);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-white to-blue-200">
      <Card className="w-full max-w-xl p-8 rounded-2xl shadow-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700 font-michroma tracking-wide mb-2">Resumo da Análise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2">
            <div><span className="font-semibold text-gray-700">Status:</span> <span className="capitalize font-bold text-blue-700">{loan.status}</span></div>
            <div><span className="font-semibold text-gray-700">Valor Solicitado:</span> R$ {loan.amount.toLocaleString()}</div>
            <div><span className="font-semibold text-gray-700">Parcelas:</span> {loan.installments}x</div>
            <div><span className="font-semibold text-gray-700">Data da Solicitação:</span> {new Date(loan.date).toLocaleDateString('pt-BR')}</div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-blue-700 mb-2">Dicas e Explicações</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {dicas.map((dica, i) => <li key={i}>{dica}</li>)}
            </ul>
          </div>
          <Button onClick={() => navigate(-1)} className="mt-2">Voltar</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanAnalysis; 