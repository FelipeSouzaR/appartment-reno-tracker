
import React from 'react';
import { Button } from '@/components/ui/button';
import { Profile } from '@/types/auth';
import { User } from '@supabase/supabase-js';

interface AuthenticatedHeaderProps {
  user: User;
  profile: Profile | null;
  onSignOut: () => void;
}

const AuthenticatedHeader = ({ user, profile, onSignOut }: AuthenticatedHeaderProps) => {
  return (
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
        <span className="text-sm text-gray-600">
          Olá, {profile?.username || user.email}
        </span>
        <Button variant="outline" onClick={onSignOut}>
          Sair
        </Button>
      </div>
    </div>
  );
};

export default AuthenticatedHeader;
