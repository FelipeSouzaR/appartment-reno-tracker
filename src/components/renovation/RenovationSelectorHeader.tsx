
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">Gerenciador de Reformas</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Bem-vindo, {profile?.username || user.email}
        </p>
      </div>
      <div className="flex space-x-2 shrink-0">
        <Button onClick={onNavigateHome} variant="outline" className="flex items-center space-x-2">
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Início</span>
        </Button>
        <Button onClick={onSignOut} variant="outline" className="flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default RenovationSelectorHeader;
