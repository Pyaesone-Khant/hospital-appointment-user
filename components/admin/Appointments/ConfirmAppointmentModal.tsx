"use client";

import { useUpdateAppointmentStatus } from "@/hooks/query-hooks/useStaff";
import { ActionIcon, ActionIconProps, Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Check } from "lucide-react";

type ConfirmAppointmentModalProps = {
    appointment: Appointment;
    buttonProps?: Omit<ActionIconProps, 'onClick'>;
    modalProps?: Omit<React.ComponentProps<typeof Modal>, 'opened' | 'onClose'>;
}

export function ConfirmAppointmentModal({
    appointment: { id },
    buttonProps,
    modalProps,
}: ConfirmAppointmentModalProps) {

    const [opened, { toggle }] = useDisclosure(false);

    const { mutate, isLoading } = useUpdateAppointmentStatus();

    const handleCancel = () => {
        mutate({ appointmentId: id, data: { confirmed: true } }, {
            onSuccess: () => {
                toggle();
            }
        })
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
                {...buttonProps}
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
                {...modalProps}
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
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
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="filled"
                        color="blue"
                        onClick={handleCancel}
                        loading={isLoading}
                    >
                        Confirm
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}
