import { useState } from 'react';
import { AuthTokens, fetchAuthSession, JWT } from 'aws-amplify/auth';
import { useAuthStore } from '@/store';

export const useAuthSession = (forceRefresh?: boolean) => {
  const { handleSetToken, handleSaveUser, handleLogOut} = useAuthStore()
  const [loading, setLoading] = useState(true);

  const handleFetchSession = async () => {
    try {
      setLoading(true);
      const session = await fetchAuthSession({ forceRefresh: !!forceRefresh });
      const { tokens } = session;
      const { idToken } = tokens as AuthTokens;

      const {
        payload
      } = idToken as JWT;


      // console.log(JSON.stringify({ tokens }, null, 2))

      if (payload) {
        handleSaveUser({
          phone_number: payload?.phone_number as string,
          name: payload?.name as string,
          email: payload?.email as string,
          username: payload['cognito:username'] as string
        })
        handleSetToken(payload?.jti as string)
      }
    } catch (err: any) {
      handleLogOut()
    } finally {
      setLoading(false);
    }
  };

  return { isLoadingSession: loading, handleFetchSession };
};

