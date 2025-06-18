import { ChangePasswordForm } from "@/components/Auth";
import { SlideUp } from "@/components/common";

export default function Page() {
    return (
        <>
            <SlideUp
                className="max-w-md mx-auto"
            >
                <ChangePasswordForm />
            </SlideUp>
        </>
    )
}
