import { SlideUp, StatusBadge } from "@/components/common"
import dayjs from "dayjs"
import { Column, MantineTable } from "../common/MantineTable"

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

export function AppointmentList() {

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
                data={data}
                rowKey={(appointment) => appointment.id.toString()}
            />
        </SlideUp>
    )
}

const getAppointmentStatus = (appointment: Appointment) => {
    switch (true) {
        case appointment.confirmed:
            return "Confirmed";
        case appointment.cancelled:
            return "Cancelled";
        default:
            return "Pending";
    }
}