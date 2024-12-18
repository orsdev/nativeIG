import { create } from 'zustand'
import { useLoadingStore } from './useLoading';
import { alertMessage } from '@/utils';
import { signOut } from 'aws-amplify/auth';

export type IAuth = {
    user: {
        phone_number: string;
        name: string;
        email: string;
        username: string
    };
    token: string;
};

interface IAuthState {
    user: IAuth['user'] | null,
    token: IAuth['token'];
    isSignedIn: boolean;
    handleLogOut(): void;
    handleClearAuth(): void;
    handleSaveUser(user: IAuth['user']): void;
    handleSetToken(token: string): void;
    handleSetIsSignedIn(isSignedIn: boolean): void;
}

export const useAuthStore = create<IAuthState>()((set) => ({
    user: null,
    token: '',
    isSignedIn: false,
    handleLogOut: async () => {
        try {
            await signOut();
            set((state) => ({
                ...state,
                user: null,
                isSignedIn: false,
                token: ''
            }));
            console.log('signed out')
        } catch (_) {
            alertMessage({
                title: 'Error',
                message: 'Can"t log out at this time. Try again',
                buttonText: 'Close'
            })
        }
    },
    handleClearAuth: async () => {
       
            set((state) => ({
                ...state,
                user: null,
                isSignedIn: false,
                token: ''
            }));
    },
    handleSetToken: (token) => {
        set({
            token
        })
    },
    handleSetIsSignedIn: (isSignedIn) => {
        set({
            isSignedIn
        })
    },
    handleSaveUser: (user) => {
        set({
            user
        })
    }
}))