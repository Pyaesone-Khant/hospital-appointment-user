import { SlideUp, StatusBadge } from "@/components/common"
import { RoleEnum } from "@/constants"
import { useGetEmployees } from "@/hooks/query-hooks/useAdmin"
import { Column, MantineTable } from "../common/MantineTable"
import { DeleteEmployeeModal } from "../Employees"

export function NurseList() {

    const { data } = useGetEmployees(RoleEnum.NURSE)

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
        },
        {
            accessor: (row) => (
                <>
                    <DeleteEmployeeModal
                        employeeId={row.nurseId}
                    />
                </>
            ),
            header: 'Actions',
        }
    ]

    return (
        <SlideUp
            className="space-y-6"
        >
            <MantineTable
                columns={columns}
                data={data as Nurse[]}
                rowKey={(nurse) => nurse.nurseId}
            />
        </SlideUp>
    )
}
