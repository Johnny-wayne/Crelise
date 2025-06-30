import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Configuracoes = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [notificacoes, setNotificacoes] = useState(true);
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setNome(user.nome || "");
      setEmail(user.email || "");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novaSenha && novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (novaSenha && !senhaAntiga) {
      alert("Digite sua senha atual para alterar a senha!");
      return;
    }

    // Simular salvamento
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const updatedUser = {
        ...user,
        nome,
        email,
        notificacoes
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }

    alert("Configurações salvas com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-white to-blue-200 py-12 px-4">
      <Card className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-3xl text-blue-700 font-michroma tracking-wide mb-4 text-center">Configurações</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Nome</label>
              <Input value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className="bg-white border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500" autoComplete="name" />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">E-mail</label>
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" className="bg-white border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500" />
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" checked={notificacoes} onChange={e => setNotificacoes(e.target.checked)} className="w-5 h-5 rounded border-gray-300 focus:ring-blue-500" />
              <span className="text-gray-700">Receber notificações por e-mail</span>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Senha atual</label>
              <Input type="password" value={senhaAntiga} onChange={e => setSenhaAntiga(e.target.value)} placeholder="Digite sua senha atual" className="bg-white border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Nova senha</label>
              <Input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} placeholder="Nova senha" className="bg-white border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Confirmar nova senha</label>
              <Input type="password" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} placeholder="Confirme a nova senha" className="bg-white border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500" />
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow font-bold text-lg transition border-0">Salvar Alterações</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuracoes; 