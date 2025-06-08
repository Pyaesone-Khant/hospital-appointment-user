"use client";

import { useSignUpContext } from "@/contexts/signup.context";
import { Text, Title } from "@mantine/core";
import { AuthModal } from "../AuthModal";
import { SignupForm } from "./SignupForm";

export function SignupModal() {

    const { opened, closeSignUpModal } = useSignUpContext();

    return (
        <>
            <AuthModal
                opened={opened}
                closeAuthModal={closeSignUpModal}
            >
                <article
                    className="text-center"
                >
                    <Title
                        order={2}
                        mb={4}
                    >
                        Become a MediCare Member
                    </Title>
                    <Text
                        c={"gray.7"}
                    >
                        Join MediCare Hospital to book appointments and manage your health.
                    </Text>
                </article>
                <SignupForm />
            </AuthModal>
        </>
    )
}
