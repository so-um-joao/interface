import { useState, useRef, useEffect } from 'react';
import { Settings, Send, MessageCircle, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Sidebar } from './ChatSidebar';
import { HelpPanel } from './HelpPanel';
import { AccessibilityMenu } from './AccessibilityMenu';
import { DiagnosticScreen } from './DiagnosticScreen';
import { SupportDialog } from './SupportDialog';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function ChatInterface({ theme, onThemeChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Em que posso ajudar?',
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Usuário: Meu computador não liga.',
      sender: 'user',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [currentView, setCurrentView] = useState<'chat' | 'diagnostic' | 'login' | 'register'>('chat');
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [chatSessions, setChatSessions] = useState<{[key: string]: Message[]}>({
    'main': [
      {
        id: '1',
        text: 'Olá! Em que posso ajudar?',
        sender: 'bot',
        timestamp: new Date(),
      },
      {
        id: '2',
        text: 'Usuário: Meu computador não liga.',
        sender: 'user',
        timestamp: new Date(),
      },
    ]
  });
  const [currentSession, setCurrentSession] = useState('main');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update messages from current session
    setMessages(chatSessions[currentSession] || []);
  }, [currentSession, chatSessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    // Update the current session
    setChatSessions(prev => ({
      ...prev,
      [currentSession]: [...(prev[currentSession] || []), userMessage]
    }));
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setChatSessions(prev => ({
        ...prev,
        [currentSession]: [...(prev[currentSession] || []), botMessage]
      }));
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('computador') || input.includes('liga') || input.includes('hardware')) {
      return 'Vou te ajudar com isso! Primeiro, verifique se o cabo de energia está conectado corretamente. Tente pressionar o botão de ligar por alguns segundos. Se não funcionar, pode ser um problema de hardware. Precisa de mais ajuda?';
    }
    
    if (input.includes('internet') || input.includes('wifi') || input.includes('conexão')) {
      return 'Para problemas de conexão: 1) Verifique se o Wi-Fi está ativado 2) Reinicie o roteador 3) Verifique se outros dispositivos conectam. Posso ajudar com mais alguma coisa?';
    }
    
    if (input.includes('senha') || input.includes('login')) {
      return 'Para recuperar sua senha, clique em "Esqueci minha senha" na tela de login. Um link será enviado para seu e-mail cadastrado.';
    }
    
    if (input.includes('obrigado') || input.includes('obrigada') || input.includes('valeu')) {
      return 'Por nada! Estou sempre aqui para ajudar. Se precisar de mais alguma coisa, é só chamar! 😊';
    }

    if (input.includes('suporte') || input.includes('atendente')) {
      return 'Você pode falar com nosso suporte humano clicando em "Falar com o suporte" no menu lateral. Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.';
    }
    
    return 'Entendi sua mensagem! Estou aqui para ajudar com problemas técnicos, dúvidas sobre o sistema ou te direcionar para o suporte humano. Como posso te ajudar especificamente?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSidebarAction = (action: string) => {
    switch(action) {
      case 'support':
        setShowSupportDialog(true);
        break;
      case 'diagnostic':
        setCurrentView('diagnostic');
        toast.info('Iniciando diagnóstico rápido do sistema...');
        break;
      case 'token':
        const newTokenId = `token-${Date.now()}`;
        setChatSessions(prev => ({
          ...prev,
          [newTokenId]: [{
            id: '1',
            text: 'Olá! Este é um novo chat temporário. Como posso ajudar?',
            sender: 'bot',
            timestamp: new Date(),
          }]
        }));
        setCurrentSession(newTokenId);
        setCurrentView('chat');
        toast.success('Novo token gerado com sucesso!');
        break;
      case 'normal':
        setCurrentSession('main');
        setCurrentView('chat');
        toast.info('Voltando ao chat normal...');
        break;
    }
  };

  // Handle login/register views
  if (currentView === 'login') {
    return (
      <LoginScreen 
        theme={theme} 
        onBack={() => setCurrentView('chat')} 
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setUserName('Usuário');
          setCurrentView('chat');
        }}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterScreen 
        theme={theme} 
        onBack={() => setCurrentView('chat')} 
        onRegisterSuccess={() => {
          setCurrentView('login');
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header 
        className={`border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        role="banner"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setShowConfig(!showConfig)}
            className={`flex items-center gap-2 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
            aria-label="Abrir configurações"
          >
            <Settings className="h-4 w-4" />
            <span>Configuração</span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl">ChatBot</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
              size="icon"
              aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
              className={theme === 'dark' ? 'hover:bg-gray-700' : ''}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Olá, {userName}
                </span>
                <Button 
                  variant="ghost" 
                  className={theme === 'dark' ? 'hover:bg-gray-700' : ''}
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserName('');
                    toast.success('Logout realizado com sucesso!');
                  }}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className={theme === 'dark' ? 'hover:bg-gray-700' : ''}
                  onClick={() => setCurrentView('register')}
                >
                  Cadastre-se
                </Button>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => setCurrentView('login')}
                >
                  Entrar
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Accessibility Menu */}
      {showConfig && <AccessibilityMenu theme={theme} onClose={() => setShowConfig(false)} />}

      {/* Main Content */}
      <main id="main-content" className="flex-1 flex" role="main">
        <div className="container mx-auto px-6 py-6 flex gap-6 h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <Sidebar theme={theme} onAction={handleSidebarAction} />

          {/* Main Content Area */}
          {currentView === 'diagnostic' ? (
            <DiagnosticScreen theme={theme} onBack={() => setCurrentView('chat')} />
          ) : (
            <div className="flex-1 flex flex-col">
              <Card className={`flex-1 flex flex-col ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} text-center`}>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {currentSession === 'main' 
                      ? 'Você está no chat com bot tire todas as suas dúvidas'
                      : 'Chat temporário - Token gerado'}
                  </p>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4" role="log" aria-live="polite" aria-atomic="false">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                            message.sender === 'user'
                              ? 'bg-indigo-600 text-white'
                              : theme === 'dark'
                              ? 'bg-gray-700 text-gray-100'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                          role="article"
                          aria-label={`Mensagem de ${message.sender === 'user' ? 'você' : 'ChatBot'}`}
                        >
                          <p>{message.text}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex gap-3"
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escreva sua mensagem... (Enter para enviar)"
                      className={`flex-1 rounded-full px-5 ${
                        theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                      }`}
                      aria-label="Digite sua mensagem"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={inputValue.trim() === ''}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-11 w-11"
                      aria-label="Enviar mensagem"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          )}

          {/* Help Panel */}
          <HelpPanel theme={theme} />
        </div>
      </main>

      {/* Support Dialog */}
      <SupportDialog 
        open={showSupportDialog} 
        onClose={() => setShowSupportDialog(false)} 
        theme={theme}
      />

      {/* Footer */}
      <footer 
        className={`border-t py-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        role="contentinfo"
      >
        <div className="container mx-auto px-6">
          <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Empresa Exemplo LTDA · contato@empresa.com · +55 (11) 99999-9999
          </p>
        </div>
      </footer>
    </div>
  );
}
