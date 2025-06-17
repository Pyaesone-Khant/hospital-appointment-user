"use client";

import { ActionIcon, Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { X } from "lucide-react";

export function CancelAppointmentModal(props: Appointment) {

    const { id } = props;
    const [opened, { toggle }] = useDisclosure(false);

    const handleCancel = () => {
        // Logic to cancel the appointment goes here
        console.log("Appointment cancelled");
        toggle(); // Close the modal after cancellation
    }

    return (
        <>
            <ActionIcon
                variant="subtle"
                color="red"
                size="lg"
                onClick={toggle}
                title="Cancel Appointment"
                aria-label="Cancel Appointment"
            >
                <X />
            </ActionIcon>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Cancel Appointment"
                centered
                classNames={{
                    title: "!text-[var(--mantine-color-red-7)] !text-lg !font-semibold",
                }}
            >
                <article>
                    <Text
                        c={"dimmed"}
                        fz={14}
                    >
                        Are you sure you want to cancel this appointment? This action cannot be undone.
                    </Text>
                </article>
                <Flex
                    justify="flex-end"
                    align="center"
                    gap={12}
                    mt={20}
                >
                    <Button
                        variant="transparent"
                        onClick={handleCancel}
                        color="gray"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="filled"
                        color="red"
                        onClick={handleCancel}
                    >
                        Confirm
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}
