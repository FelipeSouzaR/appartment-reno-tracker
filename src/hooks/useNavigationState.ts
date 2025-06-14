
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigationState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  const navigateTo = useCallback((path: string, replace = false) => {
    if (!replace) {
      setNavigationHistory(prev => [...prev, location.pathname]);
    }
    navigate(path, { replace });
  }, [navigate, location.pathname]);

  const goBack = useCallback(() => {
    if (navigationHistory.length > 0) {
      const lastPath = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      navigate(lastPath);
    } else {
      navigate(-1);
    }
  }, [navigate, navigationHistory]);

  const isCurrentPath = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);

  const getCurrentPath = useCallback(() => {
    return location.pathname;
  }, [location.pathname]);

  return {
    navigateTo,
    goBack,
    isCurrentPath,
    getCurrentPath,
    canGoBack: navigationHistory.length > 0,
    navigationHistory,
  };
};
