"use client";

import { MediCareLogo } from "@/components/common/icons";
import { useLoginContext } from "@/contexts/login.context";
import { Text, Title } from "@mantine/core";
import { AuthModal } from "../AuthModal";
import { LoginForm } from "./LoginForm";

export function LoginModal() {

    const { opened, closeLoginModal } = useLoginContext();

    return (
        <>
            <AuthModal
                opened={opened}
                closeAuthModal={closeLoginModal}
            >
                <MediCareLogo
                    className="mx-auto"
                />
                <article
                    className="text-center"
                >
                    <Title
                        order={2}
                        mb={4}
                    >
                        Welcome Back
                    </Title>
                    <Text
                        c={"gray.7"}
                    >
                        Login to your account to book appointments and view medical records.
                    </Text>
                </article>
                <LoginForm />
            </AuthModal>
        </>
    )
}
