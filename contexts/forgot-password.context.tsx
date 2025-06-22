"use client";
import { useDisclosure } from "@mantine/hooks";
import { createContext, useContext } from "react";

type ForgotPasswordContextProps = {
    opened: boolean;
    openForgotPasswordModal: () => void;
    closeForgotPasswordModal: () => void;
}

const ForgotPasswordContext = createContext<ForgotPasswordContextProps>({
    opened: false,
    openForgotPasswordModal: () => { },
    closeForgotPasswordModal: () => { },
})

export const ForgotPasswordContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [opened, { open, close }] = useDisclosure(false);

    const contextValue = {
        opened,
        openForgotPasswordModal: open,
        closeForgotPasswordModal: close,
    };

    return (
        <ForgotPasswordContext.Provider value={contextValue}>
            {children}
        </ForgotPasswordContext.Provider>
    )
}

export const useForgotPasswordContext = () => useContext(ForgotPasswordContext);