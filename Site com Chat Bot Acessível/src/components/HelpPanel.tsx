import { Card } from './ui/card';
import { HelpCircle } from 'lucide-react';

interface HelpPanelProps {
  theme: 'light' | 'dark';
}

export function HelpPanel({ theme }: HelpPanelProps) {
  const examples = [
    'Exemplos: problemas de rede, hardware',
    'Atalhos: Enter = enviar'
  ];

  return (
    <aside 
      className="w-80 flex-shrink-0"
      role="complementary"
      aria-label="Painel de ajuda"
    >
      <Card className={`p-6 h-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-indigo-600" />
          <h2>Como usar / Curiosidades</h2>
        </div>
        <div className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {examples.map((example, index) => (
            <p key={index} className="text-sm leading-relaxed">
              {example}
            </p>
          ))}
          <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="mb-2">
              <strong>Dicas:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Use comandos claros e específicos</li>
              <li>O bot entende problemas técnicos</li>
              <li>Você pode pedir suporte humano a qualquer momento</li>
              <li>Navegue pelo teclado usando Tab</li>
              <li>Pressione Esc para fechar menus</li>
            </ul>
          </div>

          <div className={`mt-6 p-4 rounded-lg border-2 ${
            theme === 'dark' 
              ? 'bg-indigo-900/20 border-indigo-700' 
              : 'bg-indigo-50 border-indigo-200'
          }`}>
            <p className="mb-2">
              <strong>Recursos de Acessibilidade:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Suporte completo a leitores de tela</li>
              <li>Navegação por teclado</li>
              <li>Tema escuro para conforto visual</li>
              <li>Alto contraste disponível</li>
              <li>Ajuste de tamanho de fonte</li>
            </ul>
          </div>
        </div>
      </Card>
    </aside>
  );
}
