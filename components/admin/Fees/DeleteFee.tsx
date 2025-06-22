import { useDeleteFee } from "@/hooks/query-hooks/useStaff";
import { ActionIcon, Button, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash } from "lucide-react";

export function DeleteFee({
    feeId
}: {
    feeId: number;
}) {

    const [opened, { toggle }] = useDisclosure(false);

    const { mutate, isLoading } = useDeleteFee();

    const onDelete = () => {
        mutate(feeId, {
            onSuccess: () => {
                toggle();
            }
        });
    }

    return (
        <>
            <ActionIcon
                c="red"
                variant="default"
                size="lg"
                onClick={toggle}
                title="Delete Fee"

            >
                <Trash
                    size={18}
                />
            </ActionIcon>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Delete Fee"
                centered
                size="md"
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
            >
                <p>
                    Are you sure you want to delete this fee? This action cannot be undone.
                </p>
                <Flex
                    justify="flex-end"
                    mt={20}
                >
                    <Button
                        color="black"
                        variant="transparent"
                        onClick={toggle}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        variant="filled"
                        onClick={onDelete}
                        loading={isLoading}
                    >
                        Confirm
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}
