"use client";

import { ActionIcon, Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Check } from "lucide-react";

export function ConfirmAppointmentModal(props: Appointment) {

    const { id } = props;
    const [opened, { toggle }] = useDisclosure(false);

    const handleCancel = () => {
        // Logic to cancel the appointment goes here
        console.log("Appointment confirmed");
        toggle(); // Close the modal after cancellation
    }

    return (
        <>
            <ActionIcon
                variant="subtle"
                color="green"
                size="lg"
                onClick={toggle}
                title="Confirm Appointment"
                aria-label="Confirm Appointment"
            >
                <Check />
            </ActionIcon>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Confirm Appointment"
                centered
                classNames={{
                    title: "!text-lg !font-semibold",
                }}
            >
                <article>
                    <Text
                        c={"dimmed"}
                        fz={14}
                    >
                        Are you sure you want to confirm this appointment? This action cannot be undone.
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
                        color="blue"
                        onClick={handleCancel}
                    >
                        Confirm
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}
