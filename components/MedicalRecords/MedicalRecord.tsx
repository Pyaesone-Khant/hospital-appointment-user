"use client";

import { useResponsive } from "@/hooks";
import { Button, Card, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

export function MedicalRecord({
    record
}: {
    record: MedicalRecord
}) {

    const { doctorName, diagnosis, patientName, createdDate } = record;

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
                <Title
                    order={isMobile ? 5 : 4}
                    fw={600}
                >
                    {patientName}&apos;s Medical Record
                </Title>
            </article>

            <div
                className="space-y-4"
            >
                <DataGrid
                    title="Doctor"
                    data={doctorName}
                />
                <DataGrid
                    title="Diagnosis"
                    data={diagnosis}
                />
                <DataGrid
                    title="Date"
                    data={dayjs(createdDate).format("MMM DD, YYYY")}
                />
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
        <Group
            className={className}
            justify="space-between"
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
        </Group>
    )
}