"use client";

import { useResponsive } from "@/hooks";
import { Card, Divider, Group, Text, Title } from "@mantine/core";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { DashboardTabContents } from "./DashboardTabContents";

interface StatisticsDataType {
    title: string;
    value: string | number;
    icon: IconName;
}

const StatisticsData: StatisticsDataType[] = [
    {
        title: "Upcoming Appointments",
        value: 2,
        icon: "calendar",
    },
    {
        title: "Medical Records",
        value: 8,
        icon: "file-text",
    },
    {
        title: "Total Payments",
        value: 5,
        icon: "credit-card",
    },
]

export function Dashboard() {

    const { isMobile } = useResponsive();

    return (
        <section
            className="space-y-8"
        >
            <article
                className="space-y-2"
            >
                <Title
                    order={isMobile ? 3 : 2}
                >
                    Dashboard
                </Title>
                <Text
                    c={"gray.8"}
                    fz={isMobile ? "sm" : "md"}
                >
                    Manage your health records, appointments, and more in one place.
                </Text>
            </article>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
                                    size={isMobile ? "md" : "lg"}
                                    fw={500}
                                    c={"gray.7"}
                                >
                                    {stat.title}
                                </Text>
                                <DynamicIcon
                                    name={stat.icon}
                                    size={isMobile ? 20 : 24}
                                />
                            </Group>
                            <Text
                                mt="sm"
                                fw={600}
                                fz={isMobile ? "xl" : "2xl"}
                            >
                                {stat.value}
                            </Text>
                        </Card>
                    ))
                }
            </div>

            <Divider />

            <DashboardTabContents />
        </section>
    )
}

