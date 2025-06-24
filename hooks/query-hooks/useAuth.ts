import { useForgotPasswordContext } from "@/contexts/forgot-password.context";
import { useLoginContext } from "@/contexts/login.context";
import { useSignUpContext } from "@/contexts/signup.context";
import { setApiToken } from "@/services/api";
import { axiosClient, CLIENT_API } from "@/services/axios-client";
import { getJwtToken } from "@/services/getJwtToken";
import { getUserData } from "@/services/getUserData";
import { useUserStore } from "@/states/zustand/user";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    const { mutate, isPending: isLoading, ...rest } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: LoginRequest) => CLIENT_API.login(data),
        onSuccess: async (data) => {
            useUserStore.getState().setJwt(data);
            getJwtToken().setJwtToken(data);
            setApiToken({
                apiInstance: axiosClient,
                token: data?.accessToken
            });

            await CLIENT_API.getCurrentUser(data?.accessToken).then((data) => {
                console.log(data)
                getUserData().setUser(data);
                useUserStore.getState().setUser(data);
            });

            notifications.show({
                title: "Login Successful",
                message: `Welcome back!`,
                color: "green",
                autoClose: 3000,
                withCloseButton: true,
            });
        },
        onError: (error: string) => {
            notifications.show({
                title: "Login Failed",
                message: error,
                color: "red",
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
        onSuccess: (data) => {
            if (data.success) {
                notifications.show({
                    title: "Sign Up Successful",
                    message: "You can now log in with your credentials.",
                    color: "green",
                    autoClose: 3000,
                    withCloseButton: true,
                });
                closeSignUpModal();
                openLoginModal();
            } else {
                notifications.show({
                    title: "Sign Up Failed",
                    message: data.message || "An error occurred during sign up.",
                    color: "red",
                    autoClose: 3000,
                    withCloseButton: true,
                });
            }
        },
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
        },
        onError: (error: string) => {
            notifications.show({
                title: "Change Password Failed",
                message: error,
                color: "red",
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
        },
        onError: (error: string) => {
            notifications.show({
                title: "Password Reset Request Failed",
                message: error,
                color: "red",
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
        },
        onError: (error: string) => {
            notifications.show({
                title: "Password Reset Failed",
                message: error,
                color: "red",
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