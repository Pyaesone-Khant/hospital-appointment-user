"use client";

import { LoginModal, SignupModal } from "@/components/Auth";
import { Footer, Header } from "@/components/common";
import { LoginContextProvider } from "@/contexts/login.context";
import { SignUpContextProvider } from "@/contexts/signup.context";
import { useUserStore } from "@/states/zustand/user";
import { redirect } from "next/navigation";

export function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    if (isAuthenticated()) {
        return redirect("/");
    }

    return (
        <LoginContextProvider>
            <SignUpContextProvider>
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
            </SignUpContextProvider>
        </LoginContextProvider>
    )
}
