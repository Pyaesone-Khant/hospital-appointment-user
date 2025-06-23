"use client";

// import { Sidebar } from "@/components/admin/common";
import { JWTRoleEnum, queryClient } from "@/constants";
import { useUserStore } from "@/states/zustand/user";
import { QueryClientProvider } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

const Sidebar = React.lazy(() => import('@/components/admin/common/Sidebar').then(module => ({ default: module.Sidebar })));

export function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const jwt = useUserStore((state) => state.jwt);

    // if (!jwt || !jwt.accessToken) {
    //     return redirect("/on-boarding");
    // }

    // if (jwt && (jwt.role !== JWTRoleEnum.ADMIN && jwt.role !== JWTRoleEnum.STAFF)) {
    //     return redirect("/");
    // }


    return (
        <QueryClientProvider
            client={queryClient}
        >
            <main className="min-h-screen flex w-full">
                <Sidebar />
                <section
                    className="flex-1 p-8 overflow-hidden"
                >
                    {children}
                </section>
            </main>
        </QueryClientProvider>
    )
}
