import { MessageSquare, Wrench, Key, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface SidebarProps {
  theme: 'light' | 'dark';
  onAction: (action: string) => void;
}

export function Sidebar({ theme, onAction }: SidebarProps) {
  const buttons = [
    {
      id: 'support',
      label: 'Falar com o suporte',
      icon: MessageSquare,
    },
    {
      id: 'diagnostic',
      label: 'Diagnóstico Rápido',
      icon: Wrench,
    },
    {
      id: 'token',
      label: 'Novo token',
      icon: Key,
    },
    {
      id: 'normal',
      label: 'Voltar para o chat normal',
      icon: ArrowLeft,
    },
  ];

  return (
    <aside 
      className="w-64 flex-shrink-0"
      role="complementary"
      aria-label="Menu lateral"
    >
      <Card className={`p-4 h-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <h2 className="mb-4">
          Chats temporários (tokens)
        </h2>
        <nav aria-label="Ações do chat">
          <div className="space-y-2">
            {buttons.map((button) => {
              const Icon = button.icon;
              return (
                <Button
                  key={button.id}
                  variant="ghost"
                  onClick={() => onAction(button.id)}
                  className={`w-full justify-start gap-3 ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-700 text-gray-200' 
                      : 'hover:bg-gray-100'
                  }`}
                  aria-label={button.label}
                >
                  <Icon className="h-4 w-4" />
                  <span>{button.label}</span>
                </Button>
              );
            })}
          </div>
        </nav>
      </Card>
    </aside>
  );
}
