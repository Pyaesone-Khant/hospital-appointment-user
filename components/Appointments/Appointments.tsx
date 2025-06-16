"use client";

import { useResponsive } from "@/hooks";
import { Text, Title } from "@mantine/core";
import { Appointment } from "./Appointment";

const data: Appointment[] = [
    {
        "id": 1,
        "patientName": "Win Aye",
        "doctorName": "Win Aye",
        "dateTime": "2025-06-11T10:00",
        "confirmed": false,
        "cancelled": true
    },
    {
        "id": 2,
        "patientName": "Win Aye",
        "doctorName": "Win Aye",
        "dateTime": "2025-06-11T10:00",
        "confirmed": false,
        "cancelled": true
    },
    {
        "id": 3,
        "patientName": "Pyae Pyae",
        "doctorName": "Win Aye",
        "dateTime": "2025-06-11T10:00",
        "confirmed": true,
        "cancelled": false
    },
    {
        "id": 4,
        "patientName": "Pyae Pyae",
        "doctorName": "Win Aye",
        "dateTime": "2025-06-11T10:00",
        "confirmed": false,
        "cancelled": false
    }
]



export function Appointments() {

    const { isMobile } = useResponsive();

    return (
        <section
            className="p-6 border border-black/10 shadow rounded-md space-y-6"
        >
            <article>
                <Title
                    order={isMobile ? 3 : 2}
                    fw={600}
                >
                    Upcoming Appointments
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
        </section>
    )
}
