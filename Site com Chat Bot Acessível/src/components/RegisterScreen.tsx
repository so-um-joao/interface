import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface RegisterScreenProps {
  theme: 'light' | 'dark';
  onBack: () => void;
  onRegisterSuccess: () => void;
}

export function RegisterScreen({ theme, onBack, onRegisterSuccess }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!acceptTerms) {
      toast.error('Você precisa aceitar os termos de uso');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Cadastro realizado com sucesso!');
      onRegisterSuccess();
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
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">Criar Conta</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Preencha os dados para se cadastrar
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome Completo *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Seu nome completo"
              className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              E-mail *
            </Label>
            <Input
              id="register-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Telefone (opcional)
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(11) 99999-9999"
              className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Senha *
            </Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Mínimo 6 caracteres"
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

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Confirmar Senha *
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Digite a senha novamente"
                className={`pr-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-0 h-full"
                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label
              htmlFor="terms"
              className="text-sm cursor-pointer leading-relaxed"
            >
              Aceito os{' '}
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-700 underline"
                onClick={() => toast.info('Termos de uso e política de privacidade')}
              >
                termos de uso
              </button>{' '}
              e{' '}
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-700 underline"
                onClick={() => toast.info('Política de privacidade')}
              >
                política de privacidade
              </button>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Criar Conta'}
          </Button>
        </form>

        <div className={`mt-6 pt-6 border-t text-center ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Já tem uma conta?{' '}
            <Button
              type="button"
              variant="link"
              className="text-indigo-600 hover:text-indigo-700 p-0"
              onClick={onBack}
            >
              Faça login
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
}
