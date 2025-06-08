"use client";

import { useResponsive } from "@/hooks";
import { Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

export function MedicalRecord({
    record
}: {
    record: MedicalRecord
}) {

    const { doctor, title, diagnosis, prescription, date, note, status } = record;
    const { name, specialty } = doctor;

    const { isMobile } = useResponsive();

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            bg={"gray.0"}
            className="space-y-6"
        >
            <article
                className="space-y-1"
            >
                <Group
                    justify="space-between"
                    align="center"
                >
                    <Title
                        order={isMobile ? 5 : 4}
                        fw={600}
                    >
                        {title}
                    </Title>
                    <Badge
                        variant="outline"
                        color={status === "Active" ? "green" : "red"}
                        fw={500}
                    >
                        {status}
                    </Badge>
                </Group>
                <Group
                    justify="space-between"
                    align="center"
                >
                    <Text
                        fz={isMobile ? "sm" : "md"}
                    >
                        {specialty.name}
                    </Text>
                    <Text
                        fz={isMobile ? "sm" : "md"}
                    >
                        {dayjs(date).format("MMM DD, YYYY")}
                    </Text>
                </Group>
            </article>

            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <DataGrid
                    title="Doctor"
                    data={name}
                />
                <DataGrid
                    title="Diagnosis"
                    data={diagnosis}
                />
                <DataGrid
                    title="Prescription"
                    data={prescription}
                    className="md:col-span-2"
                />
                {note && (
                    <DataGrid
                        title="Note"
                        data={note}
                        className="md:col-span-2"
                    />
                )}
            </div>

            <Button
                variant="light"
                color="blue"
                fullWidth
                size={isMobile ? "sm" : "md"}
            >
                View Details
            </Button>
        </Card>
    )
}

const DataGrid = ({
    title,
    data,
    className
}: {
    title: string;
    data: string;
    className?: string;
}) => {

    const { isMobile } = useResponsive();

    return (
        <Stack
            className={className}
            gap={0}
        >
            <Text
                fz={isMobile ? "sm" : "md"}
                c={"gray.7"}
            >
                {title}:
            </Text>
            <Text
                fz={isMobile ? "sm" : "md"}
                fw={500}
            >
                {data}
            </Text>
        </Stack>
    )
}