import { useRequestPasswordReset } from "@/hooks/query-hooks/useAuth";
import { Button, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export function AskEmail({
    handleNextStep,
}: {
    handleNextStep: () => void;
}) {

    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address!'),
        },
    });

    const { mutate, isLoading } = useRequestPasswordReset();

    const handleSubmit = (values: typeof form.values) => {
        mutate(values, {
            onSuccess: () => {
                handleNextStep();
            }
        })
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
                    Forgot Password
                </Title>
                <Text
                    c={"gray.6"}
                >
                    Enter your email address related to your account.
                </Text>
            </article>
            <form
                onSubmit={form.onSubmit(handleSubmit)}
                className="space-y-4"
            >
                <TextInput
                    label="Email Address"
                    placeholder="Enter your email address"
                    {...form.getInputProps('email')}
                />
                <Button
                    type="submit"
                    fullWidth
                    mt={40}
                    loading={isLoading}
                >
                    Continue
                </Button>
            </form>
        </div>
    )
}
