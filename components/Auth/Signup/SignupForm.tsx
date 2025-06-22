import { useLoginContext } from "@/contexts/login.context";
import { useSignUpContext } from "@/contexts/signup.context";
import { useSignUp } from "@/hooks/query-hooks/useAuth";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

export function SignupForm() {

    const { closeSignUpModal } = useSignUpContext();
    const { openLoginModal } = useLoginContext();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirmedPassword: '',
        },
        validate: {
            name: isNotEmpty("Full Name is required!"),
            email: (value) => (!value?.trim().length ? 'Email is required!'
                : /^\S+@\S+$/.test(value) ? null
                    : 'Invalid email!'),
            password: isNotEmpty("Password is required!"),
            confirmedPassword: (value, values) => {
                if (!value || value !== values.password) {
                    return 'Passwords do not match!'
                }
                return null
            },
        },
    });

    const { mutate, isLoading } = useSignUp();

    const handleSubmit = (values: typeof form.values) => {
        mutate(values)
    }

    return (
        <div>
            <form
                onSubmit={form.onSubmit(handleSubmit)}
                className="space-y-4"
            >

                <TextInput
                    label="Full Name"
                    placeholder="Wooki Dooki"
                    {...form.getInputProps('name')}
                />

                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <TextInput
                        label="Email"
                        placeholder="example@gmail.com"
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        label="Phone Number"
                        placeholder="123-456-7890"
                        {...form.getInputProps('phone')}
                    />
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        {...form.getInputProps('password')}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        {...form.getInputProps('confirmedPassword')}
                    />
                </div>

                <Button
                    mt={40}
                    type="submit"
                    fullWidth
                    size="md"
                    color="dark"
                    className="!bg-dark !text-white !hover:bg-dark/90 !border-none !shadow-md"
                    loading={isLoading}
                >
                    Create Account
                </Button>
            </form>

            <div
                className="mt-6 flex items-center justify-center"
            >
                <Text>
                    Already have an account?
                </Text>
                <Button
                    variant="white"
                    px={4}
                    onClick={() => {
                        closeSignUpModal();
                        openLoginModal();
                    }}
                    color="blue"
                >
                    Login
                </Button>
            </div>
        </div>
    )
}
