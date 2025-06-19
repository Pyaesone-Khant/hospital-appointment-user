import { JWTRoleEnum } from "@/constants";
import { useForgotPasswordContext } from "@/contexts/forgot-password.context";
import { useLoginContext } from "@/contexts/login.context";
import { useSignUpContext } from "@/contexts/signup.context";
import { CLIENT_API } from "@/services/axios-client";
import { getJwtToken } from "@/services/getJwtToken";
import { useUserStore } from "@/states/zustand/user";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {

    const router = useRouter();

    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: LoginRequest) => CLIENT_API.login(data),
        onSuccess: (data) => {
            useUserStore.getState().setJwt(data);
            getJwtToken().setJwtToken(data);

            const { role } = data;

            if (role === JWTRoleEnum.ADMIN || role === JWTRoleEnum.STAFF) {
                router.replace("/admin");
            } else {
                router.replace("/");
            }
            notifications.show({
                title: "Login Successful",
                message: `Welcome back!`,
                color: "green",
                autoClose: 3000,
                withCloseButton: true,
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}

export const useSignUp = () => {
    const { openLoginModal } = useLoginContext();
    const { closeSignUpModal } = useSignUpContext();

    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["signup"],
        mutationFn: (data: SignupRequest) => CLIENT_API.signup(data),
        onSuccess: () => {
            notifications.show({
                title: "Sign Up Successful",
                message: `Please check your email to verify your account.`,
                color: "green",
                autoClose: 3000,
                withCloseButton: true,
            });
            closeSignUpModal();
            openLoginModal();
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}

export const useChangePassword = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["changePassword"],
        mutationFn: (data: ChangePasswordRequest) => CLIENT_API.changePassword(data),
        onSuccess: () => {
            notifications.show({
                title: "Password Changed Successfully",
                message: `You can now log in with your new password.`,
                color: "green",
                autoClose: 3000,
                withCloseButton: true,
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
};

export const useRequestPasswordReset = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["requestPasswordReset"],
        mutationFn: (data: RequestResetPasswordRequest) => CLIENT_API.requestPasswordReset(data),
        onSuccess: () => {
            notifications.show({
                title: "Password Reset Requested",
                message: `Please check your email for further instructions.`,
                color: "green",
                autoClose: 3000,
                withCloseButton: true,
            });
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
};

export const useResetPassword = () => {

    const { openLoginModal } = useLoginContext();
    const { closeForgotPasswordModal } = useForgotPasswordContext();

    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: (data: ResetPasswordRequest) => CLIENT_API.resetPassword(data),
        onSuccess: () => {
            notifications.show({
                title: "Password Reset Successful",
                message: `You can now log in with your new password.`,
                color: "green",
                autoClose: 3000,
                withCloseButton: true,
            });
            closeForgotPasswordModal();
            openLoginModal();
        }
    });

    return {
        mutate,
        isLoading,
        ...rest
    }
}