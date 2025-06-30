import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SobreNos = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-white to-blue-200 py-12 px-4">
      <Card className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-3xl text-blue-700 font-michroma tracking-wide mb-4 text-center">Sobre Nós</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-gray-700 text-lg">
            <p>
              <span className="font-bold text-blue-700">Crelise</span> nasceu com o propósito de tornar o acesso ao crédito mais simples, transparente e inteligente para todos os brasileiros.
            </p>
            <p>
              Nossa missão é empoderar pessoas com tecnologia, educação financeira e atendimento humanizado, ajudando cada cliente a conquistar seus objetivos de forma sustentável.
            </p>
            <p>
              <span className="font-semibold">Visão:</span> Ser referência em soluções digitais de crédito, promovendo inclusão financeira e inovação no mercado.
            </p>
            <p>
              <span className="font-semibold">Valores:</span> Transparência, ética, inovação, respeito ao cliente e responsabilidade social.
            </p>
            <div>
              <span className="font-semibold">Equipe:</span>
              <ul className="list-disc pl-6 mt-2 text-base">
                <li>Especialistas em tecnologia, finanças e atendimento ao cliente.</li>
                <li>Time apaixonado por transformar vidas através do crédito consciente.</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 pt-6 border-t border-gray-100 mt-8">
              <span className="font-bold text-blue-700">Nota:</span> Crelise é um projeto pessoal fictício, criado apenas para fins de estudo, portfólio e demonstração de habilidades em desenvolvimento web. Nenhuma das informações, serviços ou funcionalidades aqui apresentadas são reais.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-12 w-full bg-blue-600 text-white font-bold rounded-xl py-2 hover:bg-blue-700 transition shadow"
            >
              Voltar
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SobreNos; 