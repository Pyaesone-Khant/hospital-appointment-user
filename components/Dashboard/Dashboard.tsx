import { Card, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Clock, FileText } from "lucide-react";

const StatisticsData = [
    {
        title: "Upcoming Appointments",
        value: 2,
        icon: <Calendar />,
    },
    {
        title: "Medical Records",
        value: 8,
        icon: <FileText />,
    },
    {
        title: "Last Checkup",
        value: dayjs().subtract(1, "month").format("MMM DD, YYYY"),
        icon: <Clock />,
    },
]

export function Dashboard() {
    return (
        <section
            className="space-y-6"
        >
            <article
                className="space-y-2"
            >
                <Title
                    order={2}
                >
                    Dashboard
                </Title>
                <Text
                    c={"gray.8"}
                >
                    Manage your health records, appointments, and more in one place.
                </Text>
            </article>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {
                    StatisticsData.map((stat, index) => (
                        <Card
                            key={index}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder

                        >
                            <Group
                                justify="space-between"
                            >
                                <Text
                                    size="lg"
                                    fw={500}
                                    c={"gray.7"}
                                >
                                    {stat.title}
                                </Text>
                                {stat.icon}
                            </Group>
                            <Text
                                mt="sm"
                                fw={600}
                                fz="h2"
                            >
                                {stat.value}
                            </Text>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}

