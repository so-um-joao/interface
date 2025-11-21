import { Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface SupportDialogProps {
  open: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function SupportDialog({ open, onClose, theme }: SupportDialogProps) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para área de transferência!`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white'}>
        <DialogHeader>
          <DialogTitle className={theme === 'dark' ? 'text-gray-100' : ''}>
            Falar com o Suporte Humano
          </DialogTitle>
          <DialogDescription className={theme === 'dark' ? 'text-gray-400' : ''}>
            Entre em contato com nossa equipe de suporte através dos canais abaixo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <div className="flex items-start gap-3 mb-3">
              <Phone className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="mb-1">Telefone</h3>
                <p className="text-2xl mb-2">
                  +55 (11) 4002-8922
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('+55 (11) 4002-8922', 'Telefone')}
                  className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}
                >
                  Copiar número
                </Button>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <div className="flex items-start gap-3 mb-3">
              <MessageSquare className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="mb-1">WhatsApp</h3>
                <p className="text-2xl mb-2">
                  +55 (11) 99999-8888
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://wa.me/5511999998888', '_blank')}
                  className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}
                >
                  Abrir WhatsApp
                </Button>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="mb-1">E-mail</h3>
                <p className="mb-2">
                  suporte@empresa.com
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('suporte@empresa.com', 'E-mail')}
                  className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}
                >
                  Copiar e-mail
                </Button>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            theme === 'dark' 
              ? 'bg-indigo-900/20 border-indigo-700' 
              : 'bg-indigo-50 border-indigo-200'
          }`}>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <h3 className="mb-1">Horário de Atendimento</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Segunda a Sexta: 9h às 18h<br />
                  Sábado: 9h às 13h<br />
                  Domingo: Fechado
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : ''}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
