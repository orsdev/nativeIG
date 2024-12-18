import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthSession } from './useAuthSession';
import { HomeNavigationProp, SignInNavigationProp } from 'App';
import { useAuthStore } from '@/store';

export const useProtectedRoute = () => {
  const { isSignedIn, user } = useAuthStore()
  const { isLoadingSession, handleFetchSession } = useAuthSession(false);
  const navigation = useNavigation<SignInNavigationProp | HomeNavigationProp>();


  useEffect(() => {
    // if(isSignedIn){
    handleFetchSession()
    // }
  }, [isSignedIn])

  useEffect(() => {
    if (!user) {
      navigation.navigate('signIn');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      navigation.navigate('homeTab' as never);
    }
  }, [user]);

  return { user }
};

