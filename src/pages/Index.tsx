
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Home, Calculator, ClipboardList } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Bem-vindo ao Seu Hub de Projetos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gerencie seu projeto de reforma do apartamento com ferramentas profissionais 
            para acompanhar, orçar e organizar cada detalhe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Gerenciador de Reforma</CardTitle>
              <CardDescription className="text-base">
                Sistema CRUD completo para acompanhar itens da reforma do seu apartamento, 
                orçamento e progresso com relatórios
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/renovation')}
                className="w-full"
                size="lg"
              >
                Começar a Gerenciar
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-secondary/20 rounded-full w-fit">
                <Calculator className="h-8 w-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Calculadora de Orçamento</CardTitle>
              <CardDescription className="text-base">
                Cálculos avançados de orçamento e controle financeiro para seu projeto de reforma
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full" size="lg" disabled>
                Em Breve
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-accent/30 rounded-full w-fit">
                <ClipboardList className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">Relatórios de Progresso</CardTitle>
              <CardDescription className="text-base">
                Gere relatórios detalhados e visualizações do progresso da sua reforma
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full" size="lg" disabled>
                Em Breve
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card border rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Funcionalidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">✓ Gerenciamento Completo de Itens</h3>
                <p className="text-muted-foreground">Adicione, edite, exclua itens de reforma com detalhes completos</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">✓ Controle de Orçamento</h3>
                <p className="text-muted-foreground">Acompanhe orçamento vs custos reais em Real Brasileiro (BRL)</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">✓ Gerenciamento de Status</h3>
                <p className="text-muted-foreground">Monitore o progresso com indicadores visuais de status</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">✓ Relatórios e Análises</h3>
                <p className="text-muted-foreground">Visualize relatórios detalhados com gráficos e estatísticas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
