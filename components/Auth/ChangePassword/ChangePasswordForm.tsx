"use client";

import { useChangePassword } from "@/hooks/query-hooks/useAuth";
import { getJwtToken } from "@/services/getJwtToken";
import { useUserStore } from "@/states/zustand/user";
import { Button, PasswordInput, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export function ChangePasswordForm({
    onModalClose,
    showTitle = true
}: {
    onModalClose?: () => void;
    showTitle?: boolean;
}) {

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validate: {
            oldPassword: (value) => (!value?.trim().length ? 'Current password is required!' : null),
            newPassword: (value) => (!value?.trim().length ? 'New password is required!' : null),
            confirmNewPassword: (value, values) => {
                if (!value || value !== values.newPassword) {
                    return 'Passwords do not match!';
                }
                return null;
            },
        },
    });

    const { mutate, isLoading } = useChangePassword();

    const handleSubmit = (values: typeof form.values) => {
        mutate(values, {
            onSuccess: () => {
                form.reset();
                if (onModalClose) {
                    onModalClose();
                }
                useUserStore.getState().clearJwt();
                getJwtToken().removeJwtToken();
            },  
        })
    }

    return (
        <div>
            {
                showTitle && (
                    <article
                        className="text-center mb-8"
                    >
                        <Title
                            order={2}
                            mb={4}
                        >
                            Change Password
                        </Title>
                        <Text
                            c={"gray.6"}
                        >
                            Update your password to keep your account secure.
                        </Text>
                    </article>
                )
            }
            <form
                onSubmit={form.onSubmit(handleSubmit)}
                className="space-y-4"
            >
                <PasswordInput
                    label="Current Password"
                    placeholder="Enter your current password"
                    {...form.getInputProps('oldPassword')}
                />

                <PasswordInput
                    label="New Password"
                    placeholder="Enter your new password"
                    {...form.getInputProps('newPassword')}
                />

                <PasswordInput
                    label="Confirm New Password"
                    placeholder="Re-enter your new password"
                    {...form.getInputProps('confirmNewPassword')}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="filled"
                    loading={isLoading}
                >
                    Confirm
                </Button>
            </form>
        </div>
    )
}
