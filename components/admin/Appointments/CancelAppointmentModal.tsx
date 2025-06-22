"use client";

import { useUpdateAppointmentStatus } from "@/hooks/query-hooks/useStaff";
import { ActionIcon, ActionIconProps, Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { X } from "lucide-react";

type CancelAppointmentModalProps = {
    appointment: Appointment;
    buttonProps?: Omit<ActionIconProps, 'onClick'>;
    modalProps?: Omit<React.ComponentProps<typeof Modal>, 'opened' | 'onClose'>;
}

export function CancelAppointmentModal({
    appointment: { id },
    buttonProps,
    modalProps,
}: CancelAppointmentModalProps) {

    const [opened, { toggle }] = useDisclosure(false);

    const { mutate, isLoading } = useUpdateAppointmentStatus();

    const handleCancel = () => {
        mutate({ appointmentId: id, data: { confirmed: false } }, {
            onSuccess: () => {
                toggle();
            }
        })
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
                {...buttonProps}
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
                {...modalProps}
                closeOnClickOutside={!isLoading}
                closeOnEscape={!isLoading}
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
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="filled"
                        color="red"
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
