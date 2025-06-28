import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AnalystSidebar from "@/components/AnalystSidebar";

const AnalystDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loans] = useState([
    {
      id: 1,
      customerName: "João Silva",
      cpf: "123.456.789-10",
      date: "2024-01-15",
      amount: 15000,
      creditScore: 785,
      status: "analyzing",
    },
    {
      id: 2,
      customerName: "Maria Santos",
      cpf: "987.654.321-00",
      date: "2024-01-14",
      amount: 8000,
      creditScore: 692,
      status: "approved",
    },
    {
      id: 3,
      customerName: "Pedro Oliveira",
      cpf: "456.789.123-45",
      date: "2024-01-13",
      amount: 25000,
      creditScore: 542,
      status: "denied",
    },
    {
      id: 4,
      customerName: "Ana Costa",
      cpf: "789.123.456-78",
      date: "2024-01-12",
      amount: 12000,
      creditScore: 721,
      status: "analyzing",
    },
  ]);

  const stats = {
    total: loans.length,
    approved: loans.filter(loan => loan.status === "approved").length,
    denied: loans.filter(loan => loan.status === "denied").length,
    analyzing: loans.filter(loan => loan.status === "analyzing").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aprovado</Badge>;
      case "analyzing":
        return <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">Em Análise</Badge>;
      case "denied":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Negado</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const filteredLoans = loans.filter(loan =>
    loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.cpf.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AnalystSidebar />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel de Análise de Crédito</h1>
          <div className="max-w-md">
            <Input
              placeholder="Buscar por nome ou CPF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Solicitações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Aprovadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.approved}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Negadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.denied}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Em Análise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.analyzing}</div>
            </CardContent>
          </Card>
        </div>

        {/* Loans Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Solicitações de Empréstimo</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Nome do Cliente
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      CPF
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Score de Crédito
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50 cursor-pointer">
                      <Link to={`/analyst/loan/${loan.id}`} className="contents">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          #{loan.id.toString().padStart(4, '0')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {loan.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {loan.cpf}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(loan.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          R$ {loan.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`font-medium ${
                            loan.creditScore >= 700 ? 'text-blue-600' :
                            loan.creditScore >= 600 ? 'text-violet-600' :
                            'text-red-600'
                          }`}>
                            {loan.creditScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(loan.status)}
                        </td>
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalystDashboard;
