
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, BarChart3, Settings, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (!user && path !== '/auth') {
      navigate('/auth');
      return;
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Gerenciador de Reformas
            </h1>
            <p className="text-lg text-gray-600">
              Organize e acompanhe suas reformas com facilidade
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Olá, {profile?.username || user.email}
                </span>
                <Button variant="outline" onClick={signOut}>
                  Sair
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/auth')} className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Entrar</span>
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Bem-vindo ao Gerenciador de Reformas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Uma ferramenta completa para gerenciar suas reformas, controlar orçamentos, 
                acompanhar fornecedores e manter tudo organizado em um só lugar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Múltiplas Reformas</h3>
                    <p className="text-sm text-gray-600">Gerencie várias reformas simultaneamente</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Controle de Usuários</h3>
                    <p className="text-sm text-gray-600">Cada usuário tem suas próprias reformas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Relatórios Detalhados</h3>
                    <p className="text-sm text-gray-600">Acompanhe gastos e progresso</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="h-8 w-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold">Configuração Flexível</h3>
                    <p className="text-sm text-gray-600">Categorias e fornecedores personalizados</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('/renovation')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                <span>Minhas Reformas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Acesse suas reformas, adicione itens e acompanhe o progresso
              </p>
              <Button className="w-full">
                {user ? 'Ir para Reformas' : 'Fazer Login'}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigation('/configuration')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-green-600" />
                <span>Configurações</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Configure categorias, fornecedores e outras preferências
              </p>
              <Button variant="outline" className="w-full">
                {user ? 'Configurar' : 'Fazer Login'}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <span>Relatórios</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Visualize relatórios detalhados dos seus gastos e progresso
              </p>
              <Button variant="outline" className="w-full">
                Em Breve
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
