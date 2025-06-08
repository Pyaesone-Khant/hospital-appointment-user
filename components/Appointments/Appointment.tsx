"use client";

import { useResponsive } from "@/hooks";
import { Badge, Card, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Clock } from "lucide-react";

export function Appointment({
    appointment
}: {
    appointment: Appointment;
}) {

    const { isMobile } = useResponsive();

    return (
        <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
        >
            <Group
                justify="space-between"
                align="center"
                mb="xs"
            >
                <Title
                    order={isMobile ? 5 : 4}
                >
                    {appointment.doctor.name}
                </Title>
                <Badge
                    color={
                        appointment.status === "Confirmed"
                            ? "green"
                            : appointment.status === "Pending"
                                ? "yellow"
                                : "red"
                    }
                    variant={
                        appointment.status === "Confirmed"
                            ? "filled"
                            : appointment.status === "Pending"
                                ? "outline"
                                : "light"
                    }
                    size="md"
                    fw={500}
                >
                    {appointment.status}
                </Badge>
            </Group>
            <Text
                mb={"xs"}
                fz={isMobile ? "sm" : "md"}
            >
                {appointment.doctor.specialty.name}
            </Text>

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
                        {dayjs(appointment.date).format("MMM D, YYYY")}
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
                        {appointment.time}
                    </Text>
                </Group>
            </Group>
        </Card>
    )
}
