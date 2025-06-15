import { Sidebar } from "@/components/admin/common";

export function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen flex w-full">
            <Sidebar />
            <section
                className="flex-1 p-4"
            >
                {children}
            </section>
        </main>
    )
}
