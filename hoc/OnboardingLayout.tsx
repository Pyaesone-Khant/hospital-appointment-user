"use client";

import { ForgotPasswordModal, LoginModal, SignupModal } from "@/components/Auth";
import { Footer, Header } from "@/components/common";
import { JWTRoleEnum, queryClient } from "@/constants";
import { ForgotPasswordContextProvider } from "@/contexts/forgot-password.context";
import { LoginContextProvider } from "@/contexts/login.context";
import { SignUpContextProvider } from "@/contexts/signup.context";
import { useUserStore } from "@/states/zustand/user";
import { QueryClientProvider } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const jwt = useUserStore((state) => state.jwt);

    if (jwt && jwt.accessToken && (jwt.role === JWTRoleEnum.ADMIN || jwt.role === JWTRoleEnum.STAFF)) return redirect("/admin");

    if (jwt && jwt.accessToken && (jwt.role !== JWTRoleEnum.ADMIN && jwt.role !== JWTRoleEnum.STAFF)) return redirect("/");

    return (
        <QueryClientProvider
            client={queryClient}
        >
            <LoginContextProvider>
                <SignUpContextProvider>
                    <ForgotPasswordContextProvider>

                        <main
                            className="min-h-screen flex flex-col w-full"
                        >
                            <Header />
                            <section className="flex-1 bg-white">
                                {children}
                            </section>
                            <Footer />
                        </main>
                        <LoginModal />
                        <SignupModal />
                        <ForgotPasswordModal />
                    </ForgotPasswordContextProvider>
                </SignUpContextProvider>
            </LoginContextProvider>
        </QueryClientProvider>
    )
}
