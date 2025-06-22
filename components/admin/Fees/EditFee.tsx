import { useUpdateFee } from "@/hooks/query-hooks/useStaff";
import { ActionIcon, Button, Flex, Modal, NumberInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Edit } from "lucide-react";

export function EditFee(props: Fee) {

    const [opened, { toggle }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            name: props.name || "",
            amount: props.amount || 0,
            description: props.description || ""
        },

        validate: {
            name: (value) => (value.length < 2 ? "Name must be at least 2 characters long" : null),
            amount: (value) => (value <= 0 ? "Amount must be greater than 0" : null),
            description: (value) => (value.length < 5 ? "Description must be at least 5 characters long" : null)
        }
    });

    const { mutate, isLoading } = useUpdateFee()

    const handleSubmit = (values: typeof form.values) => {

        const payload = {
            feeId: props.id,
            data: values
        }

        mutate(payload, {
            onSuccess: () => {
                form.reset();
                toggle();
            }
        })
    }

    return (
        <>
            <ActionIcon
                variant="default"
                size="lg"
                onClick={toggle}
                color="blue"
                c={"blue"}
            >
                <Edit
                    size={18}
                />
            </ActionIcon>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Edit Fee"
                centered
                size="md"
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
            >
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    className="space-y-6"
                >
                    <TextInput
                        label="Fee Name"
                        placeholder="Enter fee name"
                        withAsterisk
                        {...form.getInputProps("name")}
                    />

                    <NumberInput
                        label="Amount"
                        placeholder="Enter fee amount"
                        withAsterisk
                        min={0}
                        {...form.getInputProps("amount")}
                        hideControls
                    />

                    <Textarea
                        label="Description"
                        placeholder="Enter fee description"
                        withAsterisk
                        minRows={3}
                        {...form.getInputProps("description")}
                    />

                    <Flex
                        justify={"flex-end"}
                        gap={20}
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
                            type="submit"
                            loading={isLoading}
                        >
                            Confirm
                        </Button>
                    </Flex>
                </form>
            </Modal>
        </>
    )
}
