import { create } from "zustand";

type UserState = {
    jwt: string | null;
    setJwt: (jwt: string | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
    jwt: null,
    setJwt: (jwt) => set({ jwt }),
    user: null,
    setUser: (user) => set({ user }),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated })
}))