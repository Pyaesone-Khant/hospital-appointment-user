import { useCreateFee } from "@/hooks/query-hooks/useStaff";
import { Button, Flex, Modal, NumberInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";

export function AddFee() {

    const [opened, { toggle }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            name: "",
            amount: 0,
            description: ""
        },

        validate: {
            name: (value) => (value.length < 2 ? "Name must be at least 2 characters long" : null),
            amount: (value) => (value <= 0 ? "Amount must be greater than 0" : null),
            description: (value) => (value.length < 5 ? "Description must be at least 5 characters long" : null)
        }
    });

    const { mutate, isLoading } = useCreateFee()

    const handleSubmit = (values: typeof form.values) => {
        mutate(values, {
            onSuccess: () => {
                form.reset();
                toggle();
            }
        })
    }

    return (
        <>
            <Button
                onClick={toggle}
                leftSection={
                    <Plus
                        size={18}
                    />
                }
            >
                New Fee
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Add New Fee"
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
                            Submit
                        </Button>
                    </Flex>
                </form>
            </Modal>
        </>
    )
}
