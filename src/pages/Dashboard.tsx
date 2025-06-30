import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const Dashboard = () => {
  const [user] = useState({ name: "João Silva" });
  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => {
    const storedLoans = JSON.parse(localStorage.getItem("loans") || "null");
    if (storedLoans && Array.isArray(storedLoans) && storedLoans.length > 0) {
      setLoans(storedLoans);
    } else {
      setLoans([
        {
          id: 1,
          date: "2024-01-15",
          amount: 15000,
          installments: 24,
          status: "approved",
        },
        {
          id: 2,
          date: "2024-01-10",
          amount: 8000,
          installments: 12,
          status: "analyzing",
        },
        {
          id: 3,
          date: "2024-01-05",
          amount: 25000,
          installments: 36,
          status: "denied",
        },
      ]);
    }
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aprovado</Badge>;
      case "analyzing":
        return <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">Em Análise</Badge>;
      case "denied":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Negado</Badge>;
      default:
        return <Badge className="bg-gray-200 text-gray-700">{status || "Desconhecido"}</Badge>;
    }
  };

  const handleLogout = () => {
    // Implementar logout
    console.log("Logout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Minhas Solicitações</h1>
          <p className="text-gray-600">Acompanhe o status de todos os seus empréstimos</p>
        </div>

        {loans.length > 0 ? (
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-gray-200">
                        Data da Solicitação
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-gray-200">
                        Valor Solicitado
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-gray-200">
                        Parcelas
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-gray-200">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loans.map((loan) => (
                      <tr key={loan.id} className="hover:bg-gray-50 border-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-gray-200">
                          {new Date(loan.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-gray-200">
                          R$ {loan.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-gray-200">
                          {loan.installments}x
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-gray-200">
                          {getStatusBadge(loan.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-gray-200">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Nenhuma solicitação encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                Você ainda não fez nenhuma solicitação de empréstimo. Comece agora mesmo!
              </p>
              <Link to="/simulator">
                <Button>
                  Fazer minha primeira simulação
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
