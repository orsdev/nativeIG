import { create } from 'zustand'


interface ILoadingState {
  isLoading: boolean,
  setIsLoading(value: boolean): void;
  resetLoading(): void;
}

export const useLoadingStore = create<ILoadingState>()((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({
    isLoading: value
  }),
  resetLoading: () => set({
    isLoading: false
  })
}))