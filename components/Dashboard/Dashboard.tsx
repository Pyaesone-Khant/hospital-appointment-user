"use client";

import { JWTRoleEnum } from "@/constants";
import { useResponsive } from "@/hooks";
import { useGetAppointments } from "@/hooks/query-hooks/useAppointment";
import { useGetShitSchedule } from "@/hooks/query-hooks/useDoctor";
import { useGetMedicalRecords } from "@/hooks/query-hooks/useMedicalRecord";
import { useGetUserPaymentHistory } from "@/hooks/query-hooks/usePatient";
import { useUserStore } from "@/states/zustand/user";
import { Card, Divider, Group, Text, Title } from "@mantine/core";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { DashboardTabContents } from "./DashboardTabContents";

interface StatisticsDataType {
    title: string;
    value: string | number;
    icon: IconName;
}
export function Dashboard() {

    const { isMobile } = useResponsive();

    const jwt = useUserStore(state => state.jwt);
    const isUser = jwt?.role === JWTRoleEnum.USER;
    const isNurse = jwt?.role === JWTRoleEnum.NURSE;

    const { data: appointments } = useGetAppointments(jwt?.role ?? JWTRoleEnum.USER);
    const { data: medicalRecords } = useGetMedicalRecords(jwt?.role ?? JWTRoleEnum.USER);
    const { data: payments } = useGetUserPaymentHistory();
    const { data: shifts } = useGetShitSchedule(jwt?.role ?? JWTRoleEnum.DOCTOR);

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
                    !isNurse && (
                        <StatisticsDataCard
                            title="Total Appointments"
                            icon="calendar"
                            value={appointments?.length || 0}
                        />
                    )
                }

                <StatisticsDataCard
                    title="Medical Records"
                    icon="file-text"
                    value={medicalRecords?.length || 0}
                />

                {
                    isUser && (
                        <StatisticsDataCard
                            title="Total Payments"
                            icon="credit-card"
                            value={payments?.length || 0}
                        />
                    )
                }

                {
                    !isUser && (
                        <StatisticsDataCard
                            title="Shifts Scheduled"
                            icon="clock"
                            value={shifts?.length || 0}
                        />
                    )
                }
            </div>

            <Divider />

            <DashboardTabContents />
        </section>
    )
}

const StatisticsDataCard = ({
    title,
    icon,
    value
}: StatisticsDataType) => {

    const { isMobile } = useResponsive();

    return (
        <Card
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
                    {title}
                </Text>
                <DynamicIcon
                    name={icon}
                    size={isMobile ? 20 : 24}
                />
            </Group>
            <Text
                mt="sm"
                fw={600}
                fz={isMobile ? "xl" : "2xl"}
            >
                {value}
            </Text>
        </Card>
    )
}
