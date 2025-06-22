"use client";

import { JWTRoleEnum } from "@/constants";
import { useResponsive } from "@/hooks";
import { useUserStore } from "@/states/zustand/user";
import { Badge, Card, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Clock } from "lucide-react";
import { CancelAppointmentModal } from "./CancelAppointmentModal";

export function Appointment({
    appointment
}: {
    appointment: Appointment;
}) {

    const { isMobile } = useResponsive();

    const jwt = useUserStore(state => state.jwt);
    const isUser = jwt?.role === JWTRoleEnum.USER;

    return (
        <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            className="space-y-4"
        >
            <Group
                justify="space-between"
                align="center"
                mb="xs"
            >

                <Text
                    fw={500}
                    fz={isMobile ? "md" : "lg"}
                    className="truncate"
                >
                    {isUser ? `Dr. ${appointment.doctorName}` : `Patient: ${appointment.patientName}`}
                </Text>

                <Badge
                    color={
                        appointment.confirmed
                            ? "green"
                            : appointment.cancelled
                                ? "red"
                                : "yellow"
                    }
                    variant={"filled"}
                    size="md"
                    fw={500}
                >
                    {appointment.confirmed ? "Confirmed" : appointment.cancelled ? "Cancelled" : "Pending"}
                </Badge>
            </Group>

            <Group
                gap={20}
            >
                <Group
                    gap={8}
                >
                    <Calendar
                        size={20}
                    />
                    <Text
                        fw={500}
                        fz={isMobile ? "sm" : "md"}
                    >
                        {dayjs(appointment.dateTime).format("MMM D, YYYY")}
                    </Text>
                </Group>
                <Group
                    gap={8}
                >
                    <Clock
                        size={20}
                    />
                    <Text
                        fw={500}
                        fz={isMobile ? "sm" : "md"}
                    >
                        {dayjs(appointment.dateTime).format("h:mm A")}
                    </Text>
                </Group>
            </Group>

            {
                isUser && (
                    <CancelAppointmentModal
                        appointment={appointment}
                    />
                )
            }
        </Card>
    )
}
