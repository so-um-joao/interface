import { useState } from 'react';
import { X, Plus, Minus, Contrast, Type, Volume2, VolumeX, MousePointer, Keyboard, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

interface AccessibilityMenuProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

export function AccessibilityMenu({ theme, onClose }: AccessibilityMenuProps) {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState([70]);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [largePointer, setLargePointer] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(true);
  const [language, setLanguage] = useState('pt-BR');

  const increaseFontSize = () => {
    if (fontSize < 24) {
      const newSize = fontSize + 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      const newSize = fontSize - 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

  const resetFontSize = () => {
    setFontSize(16);
    document.documentElement.style.fontSize = '16px';
  };

  const toggleHighContrast = (enabled: boolean) => {
    setHighContrast(enabled);
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const toggleAnimations = (enabled: boolean) => {
    setAnimationsEnabled(enabled);
    if (!enabled) {
      document.body.style.setProperty('--animation-duration', '0s');
    } else {
      document.body.style.removeProperty('--animation-duration');
    }
  };

  const toggleLargePointer = (enabled: boolean) => {
    setLargePointer(enabled);
    if (enabled) {
      document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'black\' stroke=\'white\' stroke-width=\'1\' d=\'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z\'/%3E%3C/svg%3E") 0 0, auto';
    } else {
      document.body.style.cursor = 'auto';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-title"
    >
      <Card
        className={`w-full max-w-md p-6 m-4 ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="accessibility-title" className="text-2xl">
            Configurações de Acessibilidade
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Fechar configurações"
            className={theme === 'dark' ? 'hover:bg-gray-700' : ''}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Visual Settings */}
          <div>
            <h3 className="mb-3 text-lg">Configurações Visuais</h3>
            
            {/* Font Size Control */}
            <div className="space-y-3 mb-4">
              <Label htmlFor="font-size" className="flex items-center gap-2 text-base">
                <Type className="h-5 w-5" />
                Tamanho da Fonte
              </Label>
              <div className="flex items-center gap-3">
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
                <div 
                  className={`flex-1 text-center px-4 py-3 rounded-lg border ${
                    theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                  }`}
                >
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
                Restaurar tamanho padrão
              </Button>
            </div>

            <Separator className={`my-4 ${theme === 'dark' ? 'bg-gray-700' : ''}`} />

            {/* High Contrast Toggle */}
            <div className={`flex items-center justify-between p-4 rounded-lg border mb-4 ${
              theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="space-y-1">
                <Label htmlFor="high-contrast" className="flex items-center gap-2 text-base cursor-pointer">
                  <Contrast className="h-5 w-5" />
                  Alto Contraste
                </Label>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Aumenta o contraste entre as cores
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={toggleHighContrast}
                aria-label="Ativar alto contraste"
              />
            </div>

            {/* Animations Toggle */}
            <div className={`flex items-center justify-between p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="space-y-1">
                <Label htmlFor="animations" className="flex items-center gap-2 text-base cursor-pointer">
                  <MousePointer className="h-5 w-5" />
                  Animações
                </Label>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Ativar/desativar animações da interface
                </p>
              </div>
              <Switch
                id="animations"
                checked={animationsEnabled}
                onCheckedChange={toggleAnimations}
                aria-label="Ativar animações"
              />
            </div>
          </div>

          <Separator className={`my-4 ${theme === 'dark' ? 'bg-gray-700' : ''}`} />

          {/* Audio Settings */}
          <div>
            <h3 className="mb-3 text-lg">Configurações de Áudio</h3>
            
            <div className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="sound" className="flex items-center gap-2 text-base cursor-pointer">
                  {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  Sons do Sistema
                </Label>
                <Switch
                  id="sound"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                  aria-label="Ativar sons"
                />
              </div>
              
              {soundEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="volume" className="text-sm">
                    Volume: {soundVolume[0]}%
                  </Label>
                  <Slider
                    id="volume"
                    value={soundVolume}
                    onValueChange={setSoundVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>

          <Separator className={`my-4 ${theme === 'dark' ? 'bg-gray-700' : ''}`} />

          {/* Navigation Settings */}
          <div>
            <h3 className="mb-3 text-lg">Configurações de Navegação</h3>
            
            {/* Large Pointer */}
            <div className={`flex items-center justify-between p-4 rounded-lg border mb-4 ${
              theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="space-y-1">
                <Label htmlFor="large-pointer" className="flex items-center gap-2 text-base cursor-pointer">
                  <MousePointer className="h-5 w-5" />
                  Ponteiro Grande
                </Label>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Aumenta o tamanho do cursor
                </p>
              </div>
              <Switch
                id="large-pointer"
                checked={largePointer}
                onCheckedChange={toggleLargePointer}
                aria-label="Ativar ponteiro grande"
              />
            </div>

            {/* Keyboard Navigation */}
            <div className={`flex items-center justify-between p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="space-y-1">
                <Label htmlFor="keyboard-nav" className="flex items-center gap-2 text-base cursor-pointer">
                  <Keyboard className="h-5 w-5" />
                  Navegação por Teclado
                </Label>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Destacar elementos ao navegar com Tab
                </p>
              </div>
              <Switch
                id="keyboard-nav"
                checked={keyboardNavigation}
                onCheckedChange={setKeyboardNavigation}
                aria-label="Ativar navegação por teclado"
              />
            </div>
          </div>

          <Separator className={`my-4 ${theme === 'dark' ? 'bg-gray-700' : ''}`} />

          {/* Language Settings */}
          <div>
            <h3 className="mb-3 text-lg">Idioma</h3>
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Idioma do Sistema
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                  <SelectItem value="fr-FR">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className={`my-4 ${theme === 'dark' ? 'bg-gray-700' : ''}`} />

          {/* Keyboard Shortcuts Info */}
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-50'
          }`}>
            <h3 className="mb-2">
              Atalhos de Teclado
            </h3>
            <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li><kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">Tab</kbd> - Navegar entre elementos</li>
              <li><kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">Enter</kbd> - Enviar mensagem</li>
              <li><kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">Esc</kbd> - Fechar menus</li>
              <li><kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">Ctrl + /</kbd> - Abrir ajuda</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
