import { useState } from 'react';
import { Settings, Plus, Minus, Contrast } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

interface AccessibilityPanelProps {
  theme: 'light' | 'dark';
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  highContrast: boolean;
  onHighContrastChange: (enabled: boolean) => void;
}

export function AccessibilityPanel({
  theme,
  fontSize,
  onFontSizeChange,
  highContrast,
  onHighContrastChange,
}: AccessibilityPanelProps) {
  const [open, setOpen] = useState(false);

  const increaseFontSize = () => {
    if (fontSize < 24) {
      onFontSizeChange(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      onFontSizeChange(fontSize - 2);
    }
  };

  const resetFontSize = () => {
    onFontSizeChange(16);
  };

  return (
    <div className="fixed right-4 top-20 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className={`rounded-full shadow-lg ${
              theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            aria-label="Abrir painel de acessibilidade"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'}
        >
          <SheetHeader>
            <SheetTitle className={theme === 'dark' ? 'text-gray-100' : ''}>
              Configurações de Acessibilidade
            </SheetTitle>
            <SheetDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
              Personalize a experiência de acordo com suas necessidades
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="font-size">Tamanho da Fonte</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 12}
                  aria-label="Diminuir tamanho da fonte"
                  className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className={`flex-1 text-center px-4 py-2 rounded border ${
                  theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                }`}>
                  {fontSize}px
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseFontSize}
                  disabled={fontSize >= 24}
                  aria-label="Aumentar tamanho da fonte"
                  className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFontSize}
                className="w-full"
              >
                Restaurar padrão
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast" className="flex items-center gap-2">
                  <Contrast className="h-4 w-4" />
                  Alto Contraste
                </Label>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Aumenta o contraste entre cores
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={onHighContrastChange}
                aria-label="Ativar alto contraste"
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
