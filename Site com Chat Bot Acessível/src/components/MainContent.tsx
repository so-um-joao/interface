import { Card } from './ui/card';
import { Users, Accessibility, MessageSquare, Eye } from 'lucide-react';

interface MainContentProps {
  theme: 'light' | 'dark';
}

export function MainContent({ theme }: MainContentProps) {
  const features = [
    {
      icon: MessageSquare,
      title: 'ChatBot Inteligente',
      description: 'Assistente virtual disponível 24/7 para ajudar com suas dúvidas',
    },
    {
      icon: Accessibility,
      title: 'Totalmente Acessível',
      description: 'Design inclusivo com suporte a leitores de tela e navegação por teclado',
    },
    {
      icon: Eye,
      title: 'Temas Claro e Escuro',
      description: 'Alterne entre temas para uma experiência visual confortável',
    },
    {
      icon: Users,
      title: 'Para Todos',
      description: 'Criado pensando em acessibilidade universal e inclusão digital',
    },
  ];

  return (
    <main id="main-content" className="container mx-auto px-4 py-8" role="main">
      <section aria-labelledby="welcome-heading" className="mb-12 text-center">
        <h2 id="welcome-heading" className="text-4xl mb-4">
          Bem-vindo ao Portal Acessível
        </h2>
        <p className={`text-xl max-w-2xl mx-auto ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Uma plataforma inclusiva, desenvolvida para oferecer a melhor experiência para todos os usuários
        </p>
      </section>

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          Recursos da plataforma
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className={`p-6 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                    : 'bg-white hover:shadow-lg'
                } transition-all duration-200`}
              >
                <div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
                  }`}
                  aria-hidden="true"
                >
                  <Icon className={`h-6 w-6 ${
                    theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                  }`} />
                </div>
                <h3 className="text-xl mb-2">
                  {feature.title}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section 
        aria-labelledby="about-heading" 
        className={`mt-12 p-8 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'
        }`}
      >
        <h2 id="about-heading" className="text-3xl mb-4">
          Acessibilidade em Primeiro Lugar
        </h2>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Este portal foi desenvolvido seguindo as diretrizes WCAG 2.1 para garantir que todos possam 
          navegar, entender e interagir com o conteúdo de forma eficaz.
        </p>
        <ul className={`list-disc list-inside space-y-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <li>Navegação completa por teclado (Tab, Enter, Esc)</li>
          <li>Compatível com leitores de tela</li>
          <li>Contraste adequado entre texto e fundo</li>
          <li>Tamanho de fonte ajustável</li>
          <li>Textos alternativos em todas as imagens</li>
          <li>ChatBot acessível para suporte instantâneo</li>
        </ul>
      </section>
    </main>
  );
}
