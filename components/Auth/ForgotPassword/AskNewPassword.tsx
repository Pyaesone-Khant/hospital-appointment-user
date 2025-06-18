import { Button, PasswordInput, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export function AskNewPassword() {

    const form = useForm({
        initialValues: {
            newPassword: '',
            confirmedPassword: '',
        },
        validate: {
            newPassword: (value) => (value.length < 8 ? 'Password must be at least 8 characters long!' : null),
            confirmedPassword: (value, values) => (value !== values.newPassword ? 'Passwords do not match!' : null),
        },
    })

    const handleSubmit = (values: typeof form.values) => {
        console.log("New password submitted:", values);
        // Here you would typically send the new password to your backend for processing
        // For example:
        // api.updatePassword(values.newPassword).then(response => {
        //     console.log("Password updated successfully", response);
        // }).catch(error => {
        //     console.error("Error updating password", error);
        // });
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
                >
                    Confirm
                </Button>
            </form>
        </div>
    )
}
