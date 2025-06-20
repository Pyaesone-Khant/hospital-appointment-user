import { SlideUp, StatusBadge } from "@/components/common";
import { Column, MantineTable } from "../common/MantineTable";

const data: Staff[] = [
    {
        "staffId": 1,
        "fullName": "Ei Ei",
        "email": "Singapore",
        "address": "eiei234@gmail.com",
        "phone": "84161945",
        "active": true
    },
    {
        "staffId": 2,
        "fullName": "John Doe",
        "email": "Singapore",
        "address": "eiei234@gmail.com",
        "phone": "84161945",
        "active": true
    }
]


export function StaffList() {

    const columns: Column<Staff>[] = [
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
            header: "Address",
            accessor: "address",
        },
        {
            header: "Status",
            accessor: (row) => (
                <StatusBadge>
                    {row.active ? "Active" : "Inactive"}
                </StatusBadge>
            ),
        },
    ];

    return (
        <SlideUp>
            <MantineTable
                data={data}
                columns={columns}
                rowKey={(row) => row.staffId}
            />
        </SlideUp>
    )
}
