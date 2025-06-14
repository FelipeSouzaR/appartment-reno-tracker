
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, BarChart3, Settings } from 'lucide-react';

const WelcomeBackSection = () => {
  const features = [
    {
      icon: Building2,
      title: "Múltiplas Reformas",
      description: "Gerencie várias reformas simultaneamente",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Controle de Usuários",
      description: "Cada usuário tem suas próprias reformas",
      color: "text-green-600"
    },
    {
      icon: BarChart3,
      title: "Relatórios Detalhados",
      description: "Acompanhe gastos e progresso",
      color: "text-purple-600"
    },
    {
      icon: Settings,
      title: "Configuração Flexível",
      description: "Categorias e fornecedores personalizados",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl">Bem-vindo de volta!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Uma ferramenta completa para gerenciar suas reformas, controlar orçamentos, 
            acompanhar fornecedores e manter tudo organizado em um só lugar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center space-x-3">
                  <Icon className={`h-8 w-8 ${feature.color}`} />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeBackSection;
