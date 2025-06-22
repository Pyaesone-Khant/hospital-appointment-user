"use client";

import { useForgotPasswordContext } from "@/contexts/forgot-password.context";
import { useLoginContext } from "@/contexts/login.context";
import { useState } from "react";
import { AuthModal } from "../AuthModal";
import { AskEmail } from "./AskEmail";
import { AskNewPassword } from "./AskNewPassword";

enum STEPS {
    ASK_EMAIL = "ASK_EMAIL",
    ASK_NEW_PASSWORD = "ASK_NEW_PASSWORD",
}

export function ForgotPasswordModal() {

    const [step, setStep] = useState<STEPS>(STEPS.ASK_EMAIL);

    const { opened, closeForgotPasswordModal } = useForgotPasswordContext();
    const { openLoginModal } = useLoginContext();

    const onCloseAuthModal = () => {
        switch (step) {
            case STEPS.ASK_EMAIL:
                closeForgotPasswordModal();
                setStep(STEPS.ASK_EMAIL);
                openLoginModal();
                break;
            case STEPS.ASK_NEW_PASSWORD:
                setStep(STEPS.ASK_EMAIL);
                break;
            default:
                closeForgotPasswordModal();
                setStep(STEPS.ASK_EMAIL);
                openLoginModal();
                break;
        }
    }

    return (
        <AuthModal
            opened={opened}
            closeAuthModal={onCloseAuthModal}
        >
            {
                step === STEPS.ASK_EMAIL && (
                    <AskEmail
                        handleNextStep={() => setStep(STEPS.ASK_NEW_PASSWORD)}
                    />
                )
            }

            {
                step === STEPS.ASK_NEW_PASSWORD && (
                    <AskNewPassword />
                )
            }
        </AuthModal>
    )
}
