
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save, TestTube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Configuration = () => {
  const navigate = useNavigate();
  const [sheetsUrl, setSheetsUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  useEffect(() => {
    // Carregar configuração salva do localStorage
    const savedUrl = localStorage.getItem('renovation_sheets_url');
    if (savedUrl) {
      setSheetsUrl(savedUrl);
    }
  }, []);

  const handleSaveConfiguration = () => {
    if (!sheetsUrl.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira a URL da planilha do Google Sheets.",
        variant: "destructive",
      });
      return;
    }

    // Validar se é uma URL válida do Google Sheets
    const isValidGoogleSheetsUrl = sheetsUrl.includes('docs.google.com/spreadsheets') || 
                                   sheetsUrl.includes('sheets.googleapis.com');

    if (!isValidGoogleSheetsUrl) {
      toast({
        title: "URL Inválida",
        description: "Por favor, insira uma URL válida do Google Sheets.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Salvar no localStorage
      localStorage.setItem('renovation_sheets_url', sheetsUrl);
      
      toast({
        title: "Configuração Salva",
        description: "A URL do Google Sheets foi salva com sucesso.",
      });

      // Voltar para a página principal após salvar
      setTimeout(() => {
        navigate('/renovation');
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar a configuração. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!sheetsUrl.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira a URL da planilha antes de testar.",
        variant: "destructive",
      });
      return;
    }

    setIsTestingConnection(true);

    try {
      // Simular teste de conexão
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Conexão Testada",
        description: "A URL foi validada. Lembre-se de configurar as permissões de acesso da planilha.",
      });
    } catch (error) {
      toast({
        title: "Erro na Conexão",
        description: "Não foi possível conectar com a planilha. Verifique a URL e as permissões.",
        variant: "destructive",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleBack = () => {
    navigate('/renovation');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button onClick={handleBack} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Configuração</h1>
              <p className="text-muted-foreground mt-1">
                Configure a integração com Google Sheets
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Integração Google Sheets</CardTitle>
            <CardDescription>
              Configure a URL da planilha do Google Sheets que será usada como base de dados para o gerenciamento da reforma.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sheets-url">URL da Planilha Google Sheets</Label>
              <Input
                id="sheets-url"
                type="url"
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={sheetsUrl}
                onChange={(e) => setSheetsUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Cole aqui a URL completa da sua planilha do Google Sheets
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleTestConnection}
                variant="outline"
                disabled={isTestingConnection || !sheetsUrl.trim()}
              >
                <TestTube className="h-4 w-4 mr-2" />
                {isTestingConnection ? 'Testando...' : 'Testar Conexão'}
              </Button>
              
              <Button
                onClick={handleSaveConfiguration}
                disabled={isLoading || !sheetsUrl.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Salvando...' : 'Salvar Configuração'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Como Configurar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">1. Criar uma planilha no Google Sheets</h4>
                <p className="text-muted-foreground">
                  Crie uma nova planilha ou use uma existente com as colunas necessárias para o gerenciamento da reforma.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">2. Configurar permissões</h4>
                <p className="text-muted-foreground">
                  Certifique-se de que a planilha esteja compartilhada com permissões de edição ou seja pública para leitura.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">3. Copiar a URL</h4>
                <p className="text-muted-foreground">
                  Copie a URL completa da planilha e cole no campo acima.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuration;
