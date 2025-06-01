import { OnboardingLayout } from "@/hoc/OnboardingLayout";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <OnboardingLayout>
            {children}
        </OnboardingLayout>
    )
}
