"use client";

import { SlideUp, StatusBadge } from "@/components/common";
import { AppointmentStatus, JWTRoleEnum } from "@/constants";
import { useGetAppointments } from "@/hooks/query-hooks/useAppointment";
import { Group } from "@mantine/core";
import dayjs from "dayjs";
import { Column, MantineTable } from "../common/MantineTable";
import { CancelAppointmentModal } from "./CancelAppointmentModal";
import { ConfirmAppointmentModal } from "./ConfirmAppointmentModal";

export function AppointmentList() {
    const { data } = useGetAppointments(JWTRoleEnum.STAFF);

    const columns: Column<Appointment>[] = [
        {
            header: "Patient Name",
            accessor: "patientName",
        },
        {
            header: "Doctor Name",
            accessor: "doctorName",
        },
        {
            header: "Date",
            accessor: (appointment) => dayjs(appointment.dateTime).format("DD MMM, YYYY"),
            textAlign: 'center'
        },
        {
            header: "Time",
            accessor: (appointment) => dayjs(appointment.dateTime).format("hh:mm A"),
            textAlign: 'center'
        },
        {
            header: "Status",
            accessor: (appointment) => (
                <StatusBadge
                    color={
                        appointment.confirmed
                            ? "green"
                            : appointment.cancelled
                                ? "red"
                                : "yellow"
                    }
                >
                    {getAppointmentStatus(appointment)}
                </StatusBadge>
            ),
            textAlign: 'center'
        },
        {
            header: "Actions",
            accessor: (appointment) => (
                <Group
                    justify="center"
                >
                    <ConfirmAppointmentModal
                        appointment={appointment}
                        buttonProps={{
                            disabled: appointment.confirmed || appointment.cancelled,
                        }}
                    />
                    <CancelAppointmentModal
                        appointment={appointment}
                        buttonProps={{
                            disabled: appointment.cancelled,
                        }}
                    />
                </Group>
            ),
            textAlign: 'center'

        }
    ]

    return (
        <SlideUp
            className="space-y-6"
        >
            <h2
                className="text-2xl font-semibold"
            >
                Appointment List
            </h2>
            <MantineTable
                columns={columns}
                data={data || []}
                rowKey={(appointment) => appointment.id.toString()}
            />
        </SlideUp>
    )
}

const getAppointmentStatus = (appointment: Appointment) => {
    switch (true) {
        case appointment.confirmed:
            return AppointmentStatus.CONFIRMED;
        case appointment.cancelled:
            return AppointmentStatus.CANCELLED;
        default:
            return AppointmentStatus.PENDING;
    }
}