import { useLoginContext } from "@/contexts/login.context";
import { useSignUpContext } from "@/contexts/signup.context";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

export function LoginForm() {

    const { closeLoginModal } = useLoginContext();
    const { openSignUpModal } = useSignUpContext()

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (!value?.trim().length ? 'Email is required!'
                : /^\S+@\S+$/.test(value) ? null
                    : 'Invalid email!'),
            password: isNotEmpty("Password is required!"),
        },
    })

    const handleSubmit = (values: typeof form.values) => {
        console.log(values)
    }

    return (
        <div>
            <form
                onSubmit={form.onSubmit(handleSubmit)}
                className="space-y-4"
            >
                <TextInput
                    label="Email"
                    placeholder="example@gmail.com"
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    {...form.getInputProps('password')}
                />

                <Button
                    type="submit"
                    fullWidth
                    size="md"
                    color="dark"
                    className="!bg-dark !text-white !hover:bg-dark/90 !border-none !shadow-md"
                >
                    Login
                </Button>
            </form>

            <div
                className="mt-6 flex items-center justify-center"
            >
                <Text>
                    Don&apos;t have an account?
                </Text>
                <Button
                    variant="white"
                    px={4}
                    onClick={() => {
                        closeLoginModal();
                        openSignUpModal();
                    }}
                >
                    Sign Up
                </Button>
            </div>
        </div>
    )
}
