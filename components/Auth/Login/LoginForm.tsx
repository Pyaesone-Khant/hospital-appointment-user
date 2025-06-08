import { useLoginContext } from "@/contexts/login.context";
import { useSignUpContext } from "@/contexts/signup.context";
import { useUserStore } from "@/states/zustand/user";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export function LoginForm() {

    const { closeLoginModal } = useLoginContext();
    const { openSignUpModal } = useSignUpContext();
    const router = useRouter();

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
        const { email, password } = values;
        console.log("Login submitted with values:", { email, password });
        const dummyUser = {
            id: 1,
            name: "John Doe",
            email: email,
            role: "patient",
        } as User;

        // Simulate successful login
        useUserStore.getState().setUser(dummyUser);
        useUserStore.getState().setIsAuthenticated(true);
        notifications.show({
            title: "Login Successful",
            message: `Welcome back, ${dummyUser.name}!`,
            color: "green",
            autoClose: 3000,
            withCloseButton: true,
        });
        router.replace("/")
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
