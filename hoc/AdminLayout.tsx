// import { Sidebar } from "@/components/admin/common";
import React from "react";

const Sidebar = React.lazy(() => import('@/components/admin/common/Sidebar').then(module => ({ default: module.Sidebar })));

export function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen flex w-full">
            <Sidebar />
            <section
                className="flex-1 p-4 overflow-hidden"
            >
                {children}
            </section>
        </main>
    )
}
