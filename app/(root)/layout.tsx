import { RootLayout } from "@/hoc/RootLayout";

export default function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <RootLayout>
            {children}
        </RootLayout>
    );
}
