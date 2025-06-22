import { useCreateDepartment } from "@/hooks/query-hooks/useAdmin";
import { Button, Flex, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";

export function AddNewDepartment() {

    const [opened, { toggle }] = useDisclosure(false);

    const { mutate, isLoading } = useCreateDepartment();

    const form = useForm({
        initialValues: {
            name: "",
        },

        validate: {
            name: (value) => (value.length < 2 ? "Department name must be at least 2 characters" : null),
        }
    });

    const handleSubmit = (values: typeof form.values) => {
        mutate(values, {
            onSuccess: () => {
                toggle();
                form.reset();
            }
        });
    }

    return (
        <>
            <Button
                leftSection={<Plus />}
                variant="outline"
                color="blue"
                onClick={toggle}
                size="sm"
            >
                New Department
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Add New Department"
                centered
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    className="space-y-8"
                >
                    <TextInput
                        label="Department Name"
                        placeholder="Enter department name"
                        {...form.getInputProps("name")}
                    />

                    <Flex justify="flex-end" gap={20}>
                        <Button
                            variant="transparent"
                            color="gray"
                            onClick={toggle}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="blue"
                            loading={isLoading}
                        >
                            Create
                        </Button>
                    </Flex>
                </form>
            </Modal >
        </>
    )
}
