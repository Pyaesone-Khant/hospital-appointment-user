import { SlideUp, StatusBadge } from "@/components/common"
import { RoleEnum } from "@/constants"
import { useGetEmployees } from "@/hooks/query-hooks/useAdmin"
import { Group } from "@mantine/core"
import { Column, MantineTable } from "../common/MantineTable"
import { DeleteEmployeeModal, UpdateEmployeeModal } from "../Employees"
import { AssignNurseToDoctor } from "./AssignNurseToDoctor"

export function DoctorList() {
    const { data } = useGetEmployees(RoleEnum.DOCTOR)

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
                    <AssignNurseToDoctor
                        doctorId={doctor.doctorId}
                    />
                    <UpdateEmployeeModal
                        employee={doctor}
                        role={RoleEnum.DOCTOR}
                    />
                    <DeleteEmployeeModal
                        employeeId={doctor.doctorId}
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
            <MantineTable
                columns={columns}
                data={data as Doctor[]}
                rowKey={(row) => row.doctorId}
            />
        </SlideUp>
    )
}
