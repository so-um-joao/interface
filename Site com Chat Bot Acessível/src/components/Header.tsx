import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header 
      className={`sticky top-0 z-40 border-b ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu de navegação"
            className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl">
            Portal Acessível
          </h1>
        </div>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-2">
            <li>
              <Button
                variant="ghost"
                onClick={onToggleTheme}
                aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
                className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
                <span className="ml-2 hidden sm:inline">
                  {theme === 'light' ? 'Escuro' : 'Claro'}
                </span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
