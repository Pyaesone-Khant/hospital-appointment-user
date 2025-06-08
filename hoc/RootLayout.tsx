"use client";

import { Header } from "@/components/common";
import { useUserStore } from "@/states/zustand/user";
import React from "react";

export function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const isAuthenticated = useUserStore((state) => state.isAuthenticated)

    // if (!isAuthenticated) {
    //     return redirect("/on-boarding")
    // }

    return (
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
    )
}
