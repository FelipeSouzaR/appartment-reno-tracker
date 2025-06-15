
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/home/LoadingScreen';
import UnauthenticatedHeader from '@/components/home/UnauthenticatedHeader';
import WelcomeSection from '@/components/home/WelcomeSection';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import AuthenticatedHeader from '@/components/home/AuthenticatedHeader';
import WelcomeBackSection from '@/components/home/WelcomeBackSection';
import ActionCards from '@/components/home/ActionCards';
import AdContainer from '@/components/ads/AdContainer';

const Index = () => {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (!user && path !== '/auth') {
      navigate('/auth');
      return;
    }
    navigate(path);
  };

  const handleAuthClick = () => navigate('/auth');

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  // If user is not authenticated, show a simpler landing page with prominent auth CTA
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <UnauthenticatedHeader onAuthClick={handleAuthClick} />
          
          {/* Ad banner no topo */}
          <AdContainer adType="leaderboard" position="top" className="mb-6" />
          
          <WelcomeSection onAuthClick={handleAuthClick} />
          <FeaturesGrid />
          
          {/* Ad retângulo no final */}
          <AdContainer adType="rectangle" position="bottom" className="mt-8" />
        </div>
      </div>
    );
  }

  // Authenticated user view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <AuthenticatedHeader user={user} profile={profile} onSignOut={signOut} />
        
        {/* Ad banner para usuários autenticados */}
        <AdContainer adType="banner" position="top" className="mb-6" />
        
        <WelcomeBackSection />
        <ActionCards onNavigate={handleNavigation} />
        
        {/* Ad retângulo no final */}
        <AdContainer adType="rectangle" position="bottom" className="mt-8" />
      </div>
    </div>
  );
};

export default Index;
