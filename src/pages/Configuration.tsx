
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Database, FileText, Download, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Configuration = () => {
  const navigate = useNavigate();
  const [dataStatus, setDataStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkDataStatus();
  }, []);

  const checkDataStatus = () => {
    // Check if YAML data exists in localStorage
    const savedData = localStorage.getItem('renovation_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setDataStatus(`Dados carregados: ${data.length} itens encontrados`);
      } catch (error) {
        setDataStatus('Erro ao carregar dados salvos');
      }
    } else {
      setDataStatus('Nenhum dado encontrado');
    }
  };

  const handleExportData = () => {
    const savedData = localStorage.getItem('renovation_data');
    if (!savedData) {
      toast({
        title: "Nenhum Dado",
        description: "Não há dados para exportar.",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = JSON.parse(savedData);
      const yamlContent = convertToYAML(data);
      downloadFile(yamlContent, 'renovation_data.yaml', 'text/yaml');
      
      toast({
        title: "Dados Exportados",
        description: "Arquivo YAML baixado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro na Exportação",
        description: "Erro ao exportar os dados.",
        variant: "destructive",
      });
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.yaml,.yml';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const yamlContent = event.target?.result as string;
            const data = parseYAML(yamlContent);
            localStorage.setItem('renovation_data', JSON.stringify(data));
            checkDataStatus();
            
            toast({
              title: "Dados Importados",
              description: "Arquivo YAML importado com sucesso.",
            });
          } catch (error) {
            toast({
              title: "Erro na Importação",
              description: "Erro ao importar o arquivo YAML.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const convertToYAML = (data: any[]) => {
    let yaml = 'renovation_items:\n';
    data.forEach((item, index) => {
      yaml += `  - id: "${item.id}"\n`;
      yaml += `    itemNumber: "${item.itemNumber}"\n`;
      yaml += `    category: "${item.category}"\n`;
      yaml += `    description: "${item.description}"\n`;
      yaml += `    supplier: "${item.supplier}"\n`;
      yaml += `    budget: ${item.budget}\n`;
      yaml += `    estimatedPrice: ${item.estimatedPrice}\n`;
      yaml += `    purchaseDate: "${item.purchaseDate}"\n`;
      yaml += `    paidValue: ${item.paidValue}\n`;
      yaml += `    status: "${item.status}"\n`;
      yaml += `    paymentMethod: "${item.paymentMethod}"\n`;
      yaml += `    observations: "${item.observations}"\n`;
      if (index < data.length - 1) yaml += '\n';
    });
    return yaml;
  };

  const parseYAML = (yamlContent: string) => {
    // Simple YAML parser for our specific structure
    const lines = yamlContent.split('\n');
    const items = [];
    let currentItem: any = {};
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- id:')) {
        if (Object.keys(currentItem).length > 0) {
          items.push(currentItem);
        }
        currentItem = { id: trimmed.split('"')[1] };
      } else if (trimmed.includes(':')) {
        const [key, ...valueParts] = trimmed.split(':');
        const value = valueParts.join(':').trim();
        const cleanKey = key.trim();
        const cleanValue = value.replace(/^"(.*)"$/, '$1');
        
        if (cleanKey === 'budget' || cleanKey === 'estimatedPrice' || cleanKey === 'paidValue') {
          currentItem[cleanKey] = parseFloat(cleanValue) || 0;
        } else {
          currentItem[cleanKey] = cleanValue;
        }
      }
    }
    
    if (Object.keys(currentItem).length > 0) {
      items.push(currentItem);
    }
    
    return items;
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBack = () => {
    navigate('/renovation');
  };

  const createSampleData = () => {
    setIsLoading(true);
    
    const sampleData = [
      {
        id: '1',
        itemNumber: '001',
        category: 'Cozinha',
        description: 'Bancada de granito para cozinha',
        supplier: 'Marmoraria Silva',
        budget: 2500,
        estimatedPrice: 2300,
        purchaseDate: '2024-01-15',
        paidValue: 2300,
        status: 'Concluído',
        paymentMethod: 'PIX',
        observations: 'Instalação incluída no preço'
      }
    ];
    
    try {
      localStorage.setItem('renovation_data', JSON.stringify(sampleData));
      checkDataStatus();
      
      toast({
        title: "Dados de Exemplo Criados",
        description: "Um item de exemplo foi adicionado ao banco de dados.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar dados de exemplo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                Gerencie os dados da reforma usando arquivos YAML
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Dados YAML</CardTitle>
            <CardDescription>
              Os dados da reforma são armazenados em arquivos YAML no repositório da aplicação.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">Status dos Dados</p>
                <p className="text-sm text-muted-foreground">{dataStatus}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={handleExportData} variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Exportar YAML</span>
              </Button>
              
              <Button onClick={handleImportData} variant="outline" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Importar YAML</span>
              </Button>

              <Button onClick={createSampleData} disabled={isLoading} className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{isLoading ? 'Criando...' : 'Dados de Exemplo'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">1. Estrutura dos Dados</h4>
                <p className="text-muted-foreground">
                  Os dados são salvos no formato YAML, facilmente legível e editável.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">2. Exportar Dados</h4>
                <p className="text-muted-foreground">
                  Baixe seus dados em formato YAML para backup ou para versionar no repositório.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">3. Importar Dados</h4>
                <p className="text-muted-foreground">
                  Carregue um arquivo YAML existente para restaurar ou sincronizar dados.
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
