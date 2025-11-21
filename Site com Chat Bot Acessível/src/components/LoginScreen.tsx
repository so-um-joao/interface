import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface LoginScreenProps {
  theme: 'light' | 'dark';
  onBack: () => void;
  onLoginSuccess: () => void;
}

export function LoginScreen({ theme, onBack, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login realizado com sucesso!');
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Card className={`w-full max-w-md p-8 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <Button
          variant="ghost"
          onClick={onBack}
          className={`mb-6 -ml-2 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
          aria-label="Voltar"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">Bem-vindo de volta!</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Entre com suas credenciais para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`pr-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-sm cursor-pointer"
              >
                Lembrar-me
              </Label>
            </div>
            <Button
              type="button"
              variant="link"
              className="text-sm text-indigo-600 hover:text-indigo-700 p-0"
              onClick={() => toast.info('Link de recuperação enviado para seu e-mail!')}
            >
              Esqueceu a senha?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className={`mt-6 pt-6 border-t text-center ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Não tem uma conta?{' '}
            <Button
              type="button"
              variant="link"
              className="text-indigo-600 hover:text-indigo-700 p-0"
              onClick={onBack}
            >
              Cadastre-se agora
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
}
