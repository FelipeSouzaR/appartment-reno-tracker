
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import { Profile } from '@/types/auth';
import { User } from '@supabase/supabase-js';

interface RenovationSelectorHeaderProps {
  user: User;
  profile: Profile | null;
  onNavigateHome: () => void;
  onSignOut: () => void;
}

const RenovationSelectorHeader = ({
  user,
  profile,
  onNavigateHome,
  onSignOut,
}: RenovationSelectorHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Gerenciador de Reformas</h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo, {profile?.username || user.email}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button onClick={onNavigateHome} variant="outline" className="flex items-center space-x-2">
          <Home className="h-4 w-4" />
          <span>Início</span>
        </Button>
        <Button onClick={onSignOut} variant="outline" className="flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default RenovationSelectorHeader;
