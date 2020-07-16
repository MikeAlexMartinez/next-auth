import { useEffect } from 'react';
import useAuth from './useAuth';

export default function useTokenChecker() {
  const [{ isAuthenticated, checkingToken }, { checkToken }] = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      checkToken();
    }
  }, [isAuthenticated]);

  return [checkingToken, isAuthenticated];
}
