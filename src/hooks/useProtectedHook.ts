import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthSession } from './useAuthSession';
import { HomeNavigationProp, SignInNavigationProp } from 'App';
import { useAuthStore } from '@/store';
import { Hub } from 'aws-amplify/utils';

export const useProtectedRoute = () => {
  const { isSignedIn, user } = useAuthStore()
  const { handleFetchSession } = useAuthSession(false);
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

  useEffect(() => {
    const listener = (data: any) => {
      switch (data.payload.event) {
        case 'signedIn':
          console.log('user have been signedIn successfully.');
          break;
        case 'signedOut':
          console.log('user have been signedOut successfully.');
          break;
        case 'tokenRefresh':
          console.log('auth tokens have been refreshed.');
          break;
        case 'tokenRefresh_failure':
          console.log('failure while refreshing auth tokens.');
          break;
        case 'signInWithRedirect':
          console.log('signInWithRedirect API has successfully been resolved.');
          break;
        case 'signInWithRedirect_failure':
          console.log('failure while trying to resolve signInWithRedirect API.');
          break;
        case 'customOAuthState':
          console.log('custom auth')
          break;
      }
    };

    const hubListen = Hub.listen('auth', listener);
    return () => hubListen()
  }, [])

  return { user }
};

