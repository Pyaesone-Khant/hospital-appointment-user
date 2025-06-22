import { Badge, Card, Flex, Group, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Building, Clock, Stethoscope } from "lucide-react";

export function DoctorShiftCard({
    shift
}: {
    shift: DoctorShift
}) {

    const { date, departmentName, doctorName, available, specialization, startTime, endTime } = shift;

    return (
        <Card
            className="space-y-4"
            p={20}
            withBorder
            radius={8}
            shadow="sm"
        >
            <Flex
                justify={"space-between"}
            >
                <Group>
                    <Stethoscope
                        size={20}
                    />
                    <article>
                        <Title
                            order={4}
                            fw={600}
                        >
                            {doctorName}
                        </Title>
                        <Text
                            fz={14}
                            c="dimmed"
                        >
                            {specialization}
                        </Text>
                    </article>
                </Group>

                <Stack
                    gap={4}
                >
                    <Badge
                        variant="light"
                        color={available && !dayjs(date).isBefore(dayjs()) ? "green" : "red"}
                    >
                        {available && !dayjs(date).isBefore(dayjs()) ? "Available" : "Unavailable"}
                    </Badge>
                    <Text
                        fz={14}
                        c="dimmed"
                    >
                        {date}
                    </Text>
                </Stack>
            </Flex>

            <div
                className="grid md:grid-cols-3 gap-4 mt-4"
            >
                <Group>
                    <Clock
                        size={20}
                    />
                    <article>
                        <Text>
                            {startTime}
                        </Text>
                        <Text
                            fz={14}
                            c="dimmed"
                        >
                            Start Time
                        </Text>
                    </article>
                </Group>

                <Group>
                    <Clock
                        size={20}
                    />
                    <article>
                        <Text>
                            {endTime}
                        </Text>
                        <Text
                            fz={14}
                            c="dimmed"
                        >
                            End Time
                        </Text>
                    </article>
                </Group>

                <Group>
                    <Building
                        size={20}
                    />
                    <article>
                        <Badge
                            variant="light"
                            color="blue"
                        >
                            {departmentName}
                        </Badge>
                        <Text
                            fz={14}
                            c="dimmed"
                        >
                            Department
                        </Text>
                    </article>
                </Group>
            </div>
        </Card>
    )
}
