"use client";

import { queryClient } from "@/constants";
import { useUserStore } from "@/states/zustand/user";
import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";

const Header = dynamic(
    () => import("@/components/common/Header").then((mod) => mod.Header),
    { ssr: false }
)

export function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const isAuthenticated = useUserStore((state) => state.isAuthenticated)

    if (!isAuthenticated()) {
        return redirect("/on-boarding")
    }

    return (
        <QueryClientProvider
            client={queryClient}
        >
            <main
                className="min-h-screen flex flex-col w-full"
            >
                <Header />
                <section
                    className="flex-1 container mx-auto px-4 py-6"
                >
                    {children}
                </section>
            </main>
        </QueryClientProvider>
    )
}
