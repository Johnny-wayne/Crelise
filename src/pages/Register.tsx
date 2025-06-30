import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u: any) => u.email === email)) {
      setError("E-mail já cadastrado.");
      return;
    }
    const newUser = { name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setSuccess("Cadastro realizado com sucesso! Redirecionando...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-white to-blue-200">
      <form onSubmit={handleRegister} className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-8 border border-gray-200">
        <h1 className="text-3xl font-michroma font-bold text-blue-700 text-center mb-6 tracking-wide">Cadastro</h1>
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold mb-1">Nome</label>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Seu nome completo"
            className="bg-white border border-gray-300 text-gray-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold mb-1">E-mail</label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
            className="bg-white border border-gray-300 text-gray-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold mb-1">Senha</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Crie uma senha"
              className="bg-white border border-gray-300 text-gray-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition placeholder-gray-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold mb-1">Confirmar Senha</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              placeholder="Repita a senha"
              className="bg-white border border-gray-300 text-gray-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition placeholder-gray-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none"
              tabIndex={-1}
              aria-label={showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center font-medium">{success}</div>}
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow font-bold text-lg transition border-0">Cadastrar</Button>
        <div className="text-center text-gray-600 text-sm mt-2">
          Já tem conta? <span className="text-blue-700 font-semibold cursor-pointer" onClick={() => navigate('/login')}>Entrar</span>
        </div>
      </form>
    </div>
  );
};

export default Register; 