import { Badge, Card, Flex, Group, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { BriefcaseMedical, Building, Clock, Stethoscope } from "lucide-react";

export function NurseShiftCard({
    shift
}: {
    shift: NurseShift
}) {

    const { nurseName, assignedDoctorName, startTime, endTime, date, departmentName } = shift;

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
                    <BriefcaseMedical
                        size={20}
                    />
                    <article>
                        <Title
                            order={4}
                            fw={600}
                        >
                            {nurseName}
                        </Title>
                    </article>
                </Group>

                <Stack
                    gap={8}
                >
                    <Badge
                        variant="light"
                        color={dayjs(date).isBefore(dayjs()) ? "green" : "blue"}
                    >
                        {
                            dayjs(date).isBefore(dayjs()) ? "Completed" : "Upcoming"
                        }
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
                className="grid md:grid-cols-2 gap-4 mt-4"
            >
                <Group>
                    <Stethoscope
                        size={20}
                    />
                    <article>
                        <Text>
                            {assignedDoctorName}
                        </Text>
                        <Text
                            fz={14}
                            c="dimmed"
                        >
                            Assigned Doctor
                        </Text>
                    </article>
                </Group>

                <Group>
                    <Building
                        size={20}
                    />
                    <article>
                        <Badge>
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


            </div>
        </Card >
    )
}
