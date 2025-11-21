import { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Pular para conteúdo principal
      </a>

      <ChatInterface theme={theme} onThemeChange={setTheme} />

      <Toaster theme={theme} />
    </div>
  );
}
