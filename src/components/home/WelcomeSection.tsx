
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeSectionProps {
  onAuthClick: () => void;
}

const WelcomeSection = ({ onAuthClick }: WelcomeSectionProps) => {
  return (
    <div className="text-center mb-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl mb-4">Bem-vindo!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6 text-lg">
            Para começar a gerenciar suas reformas, você precisa criar uma conta ou fazer login.
          </p>
          <Button onClick={onAuthClick} size="lg" className="px-8 py-3">
            Começar Agora
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeSection;
