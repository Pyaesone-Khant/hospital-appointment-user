"use client";

import { JWTRoleEnum } from "@/constants";
import { useResponsive } from "@/hooks";
import { useGetAppointments } from "@/hooks/query-hooks/useAppointment";
import { useUserStore } from "@/states/zustand/user";
import { Text, Title } from "@mantine/core";
import { Appointment } from "./Appointment";

export function Appointments() {

    const { isMobile } = useResponsive();

    const jwt = useUserStore(state => state.jwt);

    const role = jwt?.role || JWTRoleEnum.USER;

    const { data } = useGetAppointments(role);

    return (
        <section
            className="p-6 border border-black/10 shadow rounded-md space-y-6"
        >
            <article>
                <Title
                    order={isMobile ? 3 : 2}
                    fw={600}
                >
                    Appointments
                </Title>
                <Text
                    c={"gray.7"}
                    fz={isMobile ? "sm" : "md"}
                >
                    Your upcoming appointments are listed below. You can view details, reschedule, or cancel them as needed.
                </Text>
            </article>

            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {
                    data?.map((appointment) => (
                        <Appointment
                            key={appointment.id ?? JSON.stringify(appointment)}
                            appointment={appointment}
                        />
                    ))
                }
            </div>

            {data?.length === 0 && (
                <Text
                    c={"gray.6"}
                    fz={isMobile ? "sm" : "md"}
                    className="text-center"
                >
                    No upcoming appointments found.
                </Text>
            )}
        </section>
    )
}
