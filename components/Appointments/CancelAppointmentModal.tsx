"use client"
import { useCancelAppointment } from "@/hooks/query-hooks/usePatient";
import { Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function CancelAppointmentModal({
    appointment,
}: {
    appointment: Appointment;
}) {

    const [opened, { toggle }] = useDisclosure(false);

    const { mutate, isLoading } = useCancelAppointment();

    const onCancelAppointment = () => {
        mutate(appointment.id, {
            onSuccess: () => {
                toggle();
            },
            onError: (error) => {
                console.error("Error cancelling appointment:", error);
            }
        });
    }

    return (
        <>
            <Button
                // variant="outline"
                variant="light"
                color="red"
                onClick={toggle}
                loading={isLoading}
                disabled={appointment.cancelled || appointment.confirmed}
            >
                Cancel Appointment
            </Button>
            <Modal
                opened={opened}
                onClose={toggle}
                title="Cancel Appointment"
                centered
                size="md"
            >
                <Text>
                    Are you sure you want to cancel this appointment? This action cannot be undone.
                </Text>

                <Flex
                    justify="flex-end"
                    gap={10}
                    mt={20}
                >
                    <Button
                        variant="transparent"
                        onClick={toggle}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={onCancelAppointment}
                        loading={isLoading}
                    >
                        Confirm
                    </Button>
                </Flex>
            </Modal>
        </>
    )
}
