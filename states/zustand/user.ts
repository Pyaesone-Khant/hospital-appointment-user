import { getJwtToken } from "@/services/getJwtToken";
import { getUserData } from "@/services/getUserData";
import { create } from "zustand";

type UserState = {
    jwt: JWT | undefined;
    user: User | undefined;
    setJwt: (jwt: JWT | undefined) => void;
    setUser: (user: User | undefined) => void;
    isAuthenticated: () => boolean;
    // setIsAuthenticated: (isAuthenticated: boolean) => void;
    clearJwt: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    jwt: getJwtToken().jwt,
    user: getUserData().user,
    setJwt: (jwt) => set({ jwt }),
    isAuthenticated: () => !!get().jwt,
    setUser: (user) => set({ user }),
    // setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    clearJwt: () => set({
        jwt: undefined,
        isAuthenticated: () => false,
        user: undefined
    })
}));