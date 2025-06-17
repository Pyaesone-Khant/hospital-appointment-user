import { SlideUp, StatusBadge } from "@/components/common"
import { Group } from "@mantine/core"
import { Column, MantineTable } from "../common/MantineTable"
import { AssignDoctorShiftModal } from "./AssignDoctorShiftModal"

const data: Doctor[] = [
    {
        "doctorId": 1,
        "fullName": "Thiri",
        "email": "Singapore",
        "address": "thiriyaminsu145@gmail.com",
        "phone": "84161945",
        "specialization": "Cardiology",
        "department": "Cardiology",
        "assignedNurse": "No nurse assigned",
        "active": false
    },
    {
        "doctorId": 2,
        "fullName": "Win Aye",
        "email": "Singapore",
        "address": "wwaye005@gmail.com",
        "phone": "84161945",
        "specialization": "Cardiology",
        "department": "Cardiology",
        "assignedNurse": "No nurse assigned",
        "active": true
    }
]



export function DoctorList() {

    const columns: Column<Doctor>[] = [
        {
            header: "Name",
            accessor: "fullName",
        },
        {
            header: "Email",
            accessor: "email",
        },
        {
            header: "Phone",
            accessor: "phone",
        },
        {
            header: "Specialization",
            accessor: "specialization",
        },
        {
            header: "Department",
            accessor: "department",
        },
        {
            header: "Assigned Nurse",
            accessor: "assignedNurse",
        },
        {
            header: "Status",
            accessor: (row) => (
                <StatusBadge
                    color={row.active ? "green" : "red"}
                >
                    {row.active ? "Available" : "Unavailable"}
                </StatusBadge>
            ),
            textAlign: "center"
        },
        {
            header: "Actions",
            accessor: (doctor) => (
                <Group
                    justify="center"
                >
                    <AssignDoctorShiftModal
                        {...doctor}
                    />
                </Group>
            ),
            textAlign: "center"
        }
    ]

    return (
        <SlideUp
            className="space-y-6"
        >
            <div>
                <h3 className="text-2xl font-semibold">Doctors List</h3>
            </div>
            <MantineTable
                columns={columns}
                data={data}
                rowKey={(row) => row.doctorId}
            />
        </SlideUp>
    )
}
