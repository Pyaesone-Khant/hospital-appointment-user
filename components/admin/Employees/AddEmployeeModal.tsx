import { RoleEnum } from "@/constants";
import { useCreateEmployee } from "@/hooks/query-hooks/useAdmin";
import { Button, Flex, Modal, PasswordInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";

export function AddEmployeeModal() {

    const [opened, { toggle }] = useDisclosure(false);

    const { mutate, isLoading } = useCreateEmployee();

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "Ei Ei",
            email: "eiei234@gmail.com",
            phone: "84161945",
            address: "Singapore",
            password: "asdfgh",
            confirmedPassword: "asdfgh",
            role: RoleEnum.STAFF,
            specialization: "",
            department: ""
        },

        validate: {
            name: (value) => (value.length < 2 ? "Name must be at least 2 characters" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            phone: (value) => (/^\d{8}$/.test(value) ? null : "Phone number must be 8 digits"),
            address: (value) => (value.length < 5 ? "Address must be at least 5 characters" : null),
            password: (value) => (value.length < 6 ? "Password must be at least 6 characters" : null),
            confirmedPassword: (value, values) => (value !== values.password ? "Passwords do not match" : null),
            role: (value) => (value ? null : "Role is required"),
            department: (value, { role }) => {
                if (role === RoleEnum.DOCTOR && !value) {
                    return "Department is required for doctors";
                }
                return null;
            },
            specialization: (value, { role }) => {
                if (role === RoleEnum.DOCTOR && !value) {
                    return "Specialization is required for doctors";
                }
                return null;
            }
        }
    });

    const handleSubmit = (values: typeof form.values) => {
        mutate(values, {
            onSuccess: () => {
                toggle();
                form.reset();
            }
        })
    }

    return (
        <>
            <Button
                leftSection={
                    <Plus
                        size={18}
                    />
                }
                size="md"
                onClick={toggle}
            >
                New
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Create New Staff"
                centered
                size={"xl"}
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <Flex
                        gap={20}
                        direction={{ base: "column", sm: "row" }}
                    >
                        <TextInput
                            label="Name"
                            placeholder="Enter staff name"
                            {...form.getInputProps("name")}
                            classNames={{
                                root: "w-full"
                            }}
                        />

                        <Select
                            label="Role"
                            placeholder="Select staff role"
                            data={Object.entries(RoleEnum).map(([key, value]) => ({
                                value: value,
                                label: key.charAt(0) + key.slice(1).toLowerCase() // Capitalize first letter
                            }))}
                            {...form.getInputProps("role")}
                            withAsterisk
                            classNames={{
                                root: "w-full"
                            }}
                        />

                    </Flex>

                    <Flex
                        gap={20}
                        direction={{ base: "column", sm: "row" }}
                    >
                        <TextInput
                            label="Email"
                            placeholder="Enter staff email"
                            {...form.getInputProps("email")}
                            classNames={{
                                root: "w-full"
                            }}
                            prefix="@"
                        />
                        <TextInput
                            label="Phone"
                            placeholder="Enter staff phone number"
                            {...form.getInputProps("phone")}
                            classNames={{
                                root: "w-full"
                            }}
                        />
                    </Flex>

                    <Textarea
                        label="Address"
                        placeholder="Enter staff address"
                        {...form.getInputProps("address")}
                    />

                    <Flex
                        gap={20}
                        direction={{ base: "column", sm: "row" }}
                    >
                        <PasswordInput
                            label="Password"
                            placeholder="Enter password"
                            {...form.getInputProps("password")}
                            classNames={{
                                root: "w-full"
                            }}
                        />

                        <PasswordInput
                            label="Confirm Password"
                            placeholder="Confirm password"
                            {...form.getInputProps("confirmedPassword")}
                            classNames={{
                                root: "w-full"
                            }}
                        />
                    </Flex>



                    {
                        form.values.role === RoleEnum.DOCTOR && (
                            <Flex
                                gap={20}
                                direction={{ base: "column", sm: "row" }}
                            >
                                <TextInput
                                    label="Department"
                                    placeholder="Enter department"
                                    {...form.getInputProps("department")}
                                    withAsterisk
                                    classNames={{
                                        root: "w-full"
                                    }}
                                />

                                <TextInput
                                    label="Specialization"
                                    placeholder="Enter specialization"
                                    {...form.getInputProps("specialization")}
                                    withAsterisk
                                    classNames={{
                                        root: "w-full"
                                    }}
                                />
                            </Flex>
                        )
                    }

                    <Flex
                        mt={40}
                        gap={20}
                        justify={"flex-end"}
                    >
                        <Button
                            variant="transparent"
                            color="black"
                            onClick={toggle}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={isLoading}
                        >
                            Confirm
                        </Button>
                    </Flex>
                </form>
            </Modal >
        </>
    )
}
