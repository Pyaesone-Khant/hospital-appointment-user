import { RoleEnum } from "@/constants";
import { useCreateEmployee, useGetAllDepartments, useUpdateEmployee } from "@/hooks/query-hooks/useAdmin";
import { Button, Flex, PasswordInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export function EmployeeForm({
    initialValues,
    isEditing = false,
    employeeId,
    onCloseModal,
}: {
    initialValues: CreateStaffRequest,
    isEditing?: boolean;
    employeeId?: number;
    onCloseModal: () => void;
}) {

    const form = useForm<CreateStaffRequest>({
        mode: "controlled",
        initialValues: initialValues,

        validate: {
            name: (value) => (value.length < 2 ? "Name must be at least 2 characters" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            phone: (value) => (/^\d{8,11}$/.test(value) ? null : "Invalid phone number!"),
            address: (value) => (value?.length < 5 ? "Address must be at least 5 characters" : null),
            password: (value) => (value && value?.length < 6 ? "Password must be at least 6 characters" : null),
            confirmedPassword: (value, values) => (value && value !== values.password ? "Passwords do not match" : null),
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

    const { data } = useGetAllDepartments();

    const { mutate: onCreate, isLoading: isCreating } = useCreateEmployee();

    const { mutate: onUpdate, isLoading: isUpdating } = useUpdateEmployee();

    const handleSubmit = (values: CreateStaffRequest) => {
        if (isEditing && employeeId) {
            delete values?.confirmedPassword;
            delete values?.password;
            onUpdate({ employeeId, data: values }, {
                onSuccess: (data) => {
                    if (data.success) {
                        onCloseModal();
                    }
                }
            });
        } else {
            onCreate(values, {
                onSuccess: (data) => {
                    if (data.success) {
                        form.reset();
                        onCloseModal();
                    }
                }
            });
        }
    }

    return (
        <>
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
                        readOnly={isEditing}
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
                    size="md"
                    withAsterisk
                />

                {
                    !isEditing && (
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
                    )
                }



                {
                    form.values.role === RoleEnum.DOCTOR && (
                        <Flex
                            gap={20}
                            direction={{ base: "column", sm: "row" }}
                        >
                            <Select
                                label="Department"
                                placeholder="Select department"
                                data={data?.map(department => ({
                                    value: department.name,
                                    label: department.name
                                })) || []}
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
                        onClick={onCloseModal}
                        disabled={isCreating || isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        loading={isCreating || isUpdating}
                    >
                        Confirm
                    </Button>
                </Flex>
            </form>
        </>
    )
}
