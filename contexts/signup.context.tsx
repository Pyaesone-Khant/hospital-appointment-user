"use client";
import { useDisclosure } from "@mantine/hooks";
import { createContext, useContext } from "react";

type SignUpContextProps = {
    opened: boolean;
    openSignUpModal: () => void;
    closeSignUpModal: () => void;
}

const SignUpContext = createContext<SignUpContextProps>({
    opened: false,
    openSignUpModal: () => { },
    closeSignUpModal: () => { },
})

export const SignUpContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [opened, { open, close }] = useDisclosure(false);

    const contextValue = {
        opened,
        openSignUpModal: open,
        closeSignUpModal: close,
    };

    return (
        <SignUpContext.Provider value={contextValue}>
            {children}
        </SignUpContext.Provider>
    )
}

export const useSignUpContext = () => useContext(SignUpContext);