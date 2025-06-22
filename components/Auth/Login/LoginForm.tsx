import { useForgotPasswordContext } from "@/contexts/forgot-password.context";
import { useLoginContext } from "@/contexts/login.context";
import { useSignUpContext } from "@/contexts/signup.context";
import { useLogin } from "@/hooks/query-hooks/useAuth";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

export function LoginForm() {

    const { closeLoginModal } = useLoginContext();
    const { openSignUpModal } = useSignUpContext();
    const { openForgotPasswordModal } = useForgotPasswordContext();

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

    const { mutate, isLoading } = useLogin();

    const handleSubmit = (values: typeof form.values) => {
        const { email, password } = values;

        mutate({ email, password }, {
            onSuccess: () => {
                closeLoginModal();
            }
        })
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
                    type="button"
                    color="blue"
                    variant="transparent"
                    onClick={() => {
                        closeLoginModal();
                        openForgotPasswordModal();
                    }}
                    size="sm"
                    px={0}
                    ml={"auto"}
                    display={"flex"}
                >
                    Forgot Password?
                </Button>

                <Button
                    type="submit"
                    fullWidth
                    size="md"
                    color="dark"
                    className="!bg-dark !text-white !hover:bg-dark/90 !border-none !shadow-md"
                    loading={isLoading}
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
                    color="blue"
                >
                    Sign Up
                </Button>
            </div>
        </div>
    )
}
