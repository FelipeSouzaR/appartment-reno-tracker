
import React from 'react';
import { Building2, Users, BarChart3, Settings } from 'lucide-react';

const FeaturesGrid = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div key={feature.title} className="flex flex-col items-center text-center p-6">
            <Icon className={`h-12 w-12 ${feature.color} mb-4`} />
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesGrid;
