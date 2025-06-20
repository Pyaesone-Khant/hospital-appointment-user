import { useDeleteEmployee } from "@/hooks/query-hooks/useAdmin";
import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash } from "lucide-react";

export function DeleteEmployeeModal({
    employeeId
}: {
    employeeId: number;
}) {

    const [opened, { toggle }] = useDisclosure(false);
    const { mutate, isLoading } = useDeleteEmployee();

    const handleDelete = () => {
        mutate(employeeId);
    };

    return (
        <>
            <ActionIcon
                c="red"
                variant="default"
                size="lg"
                onClick={toggle}
                title="Delete Employee"

            >
                <Trash
                    size={18}
                />
            </ActionIcon>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Delete Employee"
                centered
                size="md"
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
            >
                <Text
                    c="red"
                >
                    Are you sure you want to delete this employee? This action cannot be undone.
                </Text>
                <Group
                    justify="flex-end"
                    mt={20}
                >
                    <Button
                        color="black"
                        variant="transparent"
                        onClick={toggle}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        variant="filled"
                        onClick={handleDelete}
                        loading={isLoading}
                    >
                        Confirm
                    </Button>
                </Group>
            </Modal>
        </>
    )
}
