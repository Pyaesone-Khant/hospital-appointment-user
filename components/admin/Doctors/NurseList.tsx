import { SlideUp, StatusBadge } from "@/components/common"
import { Column, MantineTable } from "../common/MantineTable"

const data: Nurse[] = [
    {
        "nurseId": 1,
        "fullName": "Ei Myat",
        "email": "Singapore",
        "address": "eimyatchelhmue7110@gmail.com",
        "phone": "84161945",
        "assignedDoctor": "No doctor assigned",
        "active": true
    }
]


export function NurseList() {

    const columns: Column<Nurse>[] = [
        {
            accessor: 'fullName',
            header: 'Full Name',
        },
        {
            accessor: 'email',
            header: 'Email',
        },
        {
            accessor: 'address',
            header: 'Address',
        },
        {
            accessor: 'phone',
            header: 'Phone Number',
        },
        {
            accessor: 'assignedDoctor',
            header: 'Assigned Doctor',
        },
        {
            accessor: (row) => (
                <StatusBadge
                    color={row.active ? "green" : "red"}
                >
                    {row.active ? "Available" : "Unavailable"}
                </StatusBadge>
            ),
            header: 'Active Status',
        }
    ]

    return (
        <SlideUp
            className="space-y-6"
        >
            <h2
                className="text-2xl font-semibold"
            >
                Nurse List
            </h2>
            <MantineTable
                columns={columns}
                data={data}
                rowKey={(nurse) => nurse.nurseId}
            />
        </SlideUp>
    )
}
