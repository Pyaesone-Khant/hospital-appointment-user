"use client";
import { useDisclosure } from "@mantine/hooks";
import { createContext, useContext } from "react";

type LoginContextProps = {
    opened: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

const LoginContext = createContext<LoginContextProps>({
    opened: false,
    openLoginModal: () => { },
    closeLoginModal: () => { },
})

export const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [opened, { open, close }] = useDisclosure(false);

    const contextValue = {
        opened,
        openLoginModal: open,
        closeLoginModal: close,
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => useContext(LoginContext);