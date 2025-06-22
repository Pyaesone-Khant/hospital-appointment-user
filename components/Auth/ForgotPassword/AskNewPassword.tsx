import { useResetPassword } from "@/hooks/query-hooks/useAuth";
import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export function AskNewPassword() {

    const form = useForm({
        initialValues: {
            token: '',
            newPassword: '',
            confirmedPassword: '',
        },
        validate: {
            token: (value) => value?.length !== 6 ? "Invalid verification code!" : null,
            newPassword: (value) => (value.length < 8 ? 'Password must be at least 8 characters long!' : null),
            confirmedPassword: (value, values) => (value !== values.newPassword ? 'Passwords do not match!' : null),
        },
    })

    const { mutate, isLoading } = useResetPassword();

    const handleSubmit = (values: typeof form.values) => {
        mutate(values)
    }

    return (
        <div
            className="space-y-8"
        >
            <article
                className="text-center"
            >
                <Title
                    order={2}
                    mb={4}
                >
                    Create New Password
                </Title>
                <Text
                    c={"gray.6"}
                >
                    Please enter your new password below. Make sure it is at least 8 characters long and matches the confirmation.
                </Text>
            </article>
            <form
                onSubmit={form.onSubmit(handleSubmit)}
                className="space-y-4"
            >
                <TextInput
                    type="number"
                    label="Verification Code"
                    placeholder="Verification code"
                    {...form.getInputProps('token')}
                />

                <PasswordInput
                    label="New Password"
                    placeholder="Enter your new password"
                    {...form.getInputProps('newPassword')}
                />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Re-enter your new password"
                    {...form.getInputProps('confirmedPassword')}
                />

                <Button
                    type="submit"
                    fullWidth
                    mt={40}
                    loading={isLoading}
                >
                    Confirm
                </Button>
            </form>
        </div>
    )
}
