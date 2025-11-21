import { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface DiagnosticScreenProps {
  theme: 'light' | 'dark';
  onBack: () => void;
}

interface DiagnosticItem {
  id: string;
  name: string;
  status: 'checking' | 'success' | 'warning' | 'error';
  message: string;
}

export function DiagnosticScreen({ theme, onBack }: DiagnosticScreenProps) {
  const [progress, setProgress] = useState(0);
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([
    {
      id: '1',
      name: 'Conexão de Internet',
      status: 'checking',
      message: 'Verificando...',
    },
    {
      id: '2',
      name: 'Hardware do Sistema',
      status: 'checking',
      message: 'Verificando...',
    },
    {
      id: '3',
      name: 'Armazenamento em Disco',
      status: 'checking',
      message: 'Verificando...',
    },
    {
      id: '4',
      name: 'Uso de Memória RAM',
      status: 'checking',
      message: 'Verificando...',
    },
    {
      id: '5',
      name: 'Atualizações do Sistema',
      status: 'checking',
      message: 'Verificando...',
    },
  ]);

  useState(() => {
    // Simulate diagnostic process
    const runDiagnostics = async () => {
      const results = [
        { status: 'success' as const, message: 'Conexão estável - 100 Mbps' },
        { status: 'success' as const, message: 'Hardware funcionando normalmente' },
        { status: 'warning' as const, message: 'Espaço em disco: 85% utilizado' },
        { status: 'success' as const, message: 'Memória RAM: 60% em uso' },
        { status: 'error' as const, message: 'Atualizações pendentes encontradas' },
      ];

      for (let i = 0; i < results.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProgress(((i + 1) / results.length) * 100);
        setDiagnostics(prev => 
          prev.map((item, idx) => 
            idx === i 
              ? { ...item, status: results[i].status, message: results[i].message }
              : item
          )
        );
      }
    };

    runDiagnostics();
  });

  const getStatusIcon = (status: DiagnosticItem['status']) => {
    switch (status) {
      case 'checking':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Card className={`flex-1 flex flex-col ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex items-center gap-3`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Voltar"
            className={theme === 'dark' ? 'hover:bg-gray-700' : ''}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl">Diagnóstico Rápido do Sistema</h2>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Analisando o sistema...
                </p>
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-3">
              {diagnostics.map((item) => (
                <Card
                  key={item.id}
                  className={`p-4 ${
                    theme === 'dark' ? 'bg-gray-750 border-gray-600' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">
                        {item.name}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.message}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {progress === 100 && (
              <div className={`p-4 rounded-lg border-2 ${
                theme === 'dark' 
                  ? 'bg-blue-900/20 border-blue-700' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <h3 className="mb-2">Recomendações:</h3>
                <ul className={`list-disc list-inside space-y-1 text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>Considere liberar espaço em disco excluindo arquivos temporários</li>
                  <li>Execute as atualizações pendentes do sistema</li>
                  <li>Faça backup regular dos seus dados importantes</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
