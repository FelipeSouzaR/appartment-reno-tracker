
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Settings, BarChart3 } from 'lucide-react';

interface ActionCardsProps {
  onNavigate: (path: string) => void;
}

const ActionCards = ({ onNavigate }: ActionCardsProps) => {
  const actions = [
    {
      title: "Minhas Reformas",
      description: "Acesse suas reformas, adicione itens e acompanhe o progresso",
      icon: Building2,
      iconColor: "text-blue-600",
      path: "/renovation",
      buttonText: "Ir para Reformas",
      buttonVariant: "default" as const
    },
    {
      title: "Configurações",
      description: "Configure categorias, fornecedores e outras preferências",
      icon: Settings,
      iconColor: "text-green-600",
      path: "/configuration",
      buttonText: "Configurar",
      buttonVariant: "outline" as const
    },
    {
      title: "Relatórios",
      description: "Visualize relatórios detalhados dos seus gastos e progresso",
      icon: BarChart3,
      iconColor: "text-purple-600",
      path: "#",
      buttonText: "Em Breve",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action) => {
        const Icon = action.icon;
        const handleClick = action.path !== "#" ? () => onNavigate(action.path) : undefined;
        
        return (
          <Card 
            key={action.title}
            className={`hover:shadow-lg transition-shadow ${action.path !== "#" ? "cursor-pointer" : ""}`}
            onClick={handleClick}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon className={`h-6 w-6 ${action.iconColor}`} />
                <span>{action.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {action.description}
              </p>
              <Button variant={action.buttonVariant} className="w-full">
                {action.buttonText}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ActionCards;
