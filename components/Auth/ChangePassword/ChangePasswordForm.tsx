"use client";

import { Button, PasswordInput, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export function ChangePasswordForm() {

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

    const handleSubmit = (values: typeof form.values) => {
        console.log("Change Password submitted with values:", values);
        // Here you would typically call an API to change the password
        // For now, we just log the values
    }

    return (
        <div>
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
                >
                    Confirm
                </Button>
            </form>
        </div>
    )
}
