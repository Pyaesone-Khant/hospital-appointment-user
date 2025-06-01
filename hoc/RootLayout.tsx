import { redirect } from "next/navigation";
import React from "react";

export function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const isAuthenticated = false; // Replace with actual authentication logic

    if (!isAuthenticated) {
        return redirect("/on-boarding")
    }

    return children;
}
