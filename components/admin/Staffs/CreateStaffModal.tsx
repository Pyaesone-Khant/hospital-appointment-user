import { RoleEnum } from "@/constants";
import { Button, Flex, Modal, PasswordInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";

export function CreateStaffModal() {

    const [opened, { toggle }] = useDisclosure(false);

    const form = useForm({
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
        console.log(values)
    }

    return (
        <>
            <Button
                leftSection={
                    <Plus
                        size={18}
                    />
                }
            >
                New Staff
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Create New Staff"
                centered
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <TextInput
                        label="Name"
                        placeholder="Enter staff name"
                        {...form.getInputProps("name")}
                    />

                    <TextInput
                        label="Email"
                        placeholder="Enter staff email"
                        {...form.getInputProps("email")}
                    />

                    <TextInput
                        label="Phone"
                        placeholder="Enter staff phone number"
                        {...form.getInputProps("phone")}
                    />

                    <Textarea
                        label="Address"
                        placeholder="Enter staff address"
                        {...form.getInputProps("address")}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter password"
                        {...form.getInputProps("password")}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm password"
                        {...form.getInputProps("confirmedPassword")}
                    />

                    <Select
                        label="Role"
                        placeholder="Select staff role"
                        data={Object.entries(RoleEnum).map(([key, value]) => ({
                            value: value,
                            label: key.charAt(0) + key.slice(1).toLowerCase() // Capitalize first letter
                        }))}
                        {...form.getInputProps("role")}
                    />

                    {
                        form.values.role === RoleEnum.DOCTOR && (
                            <>
                                <TextInput
                                    label="Department"
                                    placeholder="Enter department"
                                    {...form.getInputProps("department")}
                                />

                                <TextInput
                                    label="Specialization"
                                    placeholder="Enter specialization"
                                    {...form.getInputProps("specialization")}
                                />
                            </>
                        )
                    }

                    <Flex
                        gap={12}
                        justify={"flex-end"}
                    >
                        <Button
                            variant="transparent"
                            color="gray"
                            onClick={toggle}
                            fullWidth
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                        >
                            Confirm
                        </Button>
                    </Flex>
                </form>
            </Modal>
        </>
    )
}
