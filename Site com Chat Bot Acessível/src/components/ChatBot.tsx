import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  theme: 'light' | 'dark';
}

export function ChatBot({ theme }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou seu assistente virtual. Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
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
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('acessibilidade')) {
      return 'Este site possui diversos recursos de acessibilidade! Você pode ajustar o tamanho da fonte, ativar alto contraste e alternar entre temas claro e escuro. Use o botão de configurações no canto superior direito.';
    }
    
    if (input.includes('ajuda') || input.includes('help')) {
      return 'Posso te ajudar com informações sobre acessibilidade, navegação do site, ou responder dúvidas gerais. O que você gostaria de saber?';
    }
    
    if (input.includes('tema') || input.includes('escuro') || input.includes('claro')) {
      return 'Para alternar entre os temas claro e escuro, clique no botão com ícone de lua/sol no cabeçalho do site.';
    }
    
    if (input.includes('oi') || input.includes('olá') || input.includes('hello')) {
      return 'Olá! É ótimo conversar com você. Como posso ajudar?';
    }

    if (input.includes('obrigado') || input.includes('obrigada') || input.includes('valeu')) {
      return 'Por nada! Estou sempre aqui para ajudar. Se precisar de mais alguma coisa, é só chamar! 😊';
    }
    
    return 'Obrigado pela sua mensagem! Estou aqui para ajudar com informações sobre acessibilidade e navegação do site. Pode me fazer perguntas!';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className={`rounded-full shadow-lg ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white h-14 w-14`}
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      role="complementary"
      aria-label="ChatBot"
    >
      <Card
        className={`w-96 shadow-2xl ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
        } ${isMinimized ? 'h-auto' : 'h-[500px]'} flex flex-col`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-blue-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-white'}`} />
            <h2 className={`${theme === 'dark' ? 'text-gray-100' : 'text-white'}`}>
              Assistente Virtual
            </h2>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              aria-label={isMinimized ? 'Maximizar chat' : 'Minimizar chat'}
              className={theme === 'dark' ? 'text-gray-100 hover:bg-gray-800' : 'text-white hover:bg-blue-600'}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
              className={theme === 'dark' ? 'text-gray-100 hover:bg-gray-800' : 'text-white hover:bg-blue-600'}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4" role="log" aria-live="polite" aria-atomic="false">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? theme === 'dark'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-gray-100'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                      role="article"
                      aria-label={`Mensagem de ${message.sender === 'user' ? 'você' : 'assistente'}`}
                    >
                      <p>{message.text}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          message.sender === 'user'
                            ? 'text-blue-100'
                            : theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div
              className={`border-t p-4 ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
                  aria-label="Digite sua mensagem"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={inputValue.trim() === ''}
                  aria-label="Enviar mensagem"
                  className={
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
