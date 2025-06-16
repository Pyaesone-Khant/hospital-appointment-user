import { getJwtToken } from "@/services/getJwtToken";
import { create } from "zustand";

type UserState = {
    jwt: JWT | undefined;
    setJwt: (jwt: JWT | undefined) => void;
    isAuthenticated: boolean;
    // setIsAuthenticated: (isAuthenticated: boolean) => void;
    clearJwt: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    jwt: getJwtToken().jwt,
    setJwt: (jwt) => set({ jwt }),
    isAuthenticated: !!getJwtToken().jwt,
    // setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    clearJwt: () => set({
        jwt: undefined,
        isAuthenticated: false,
    })
}));