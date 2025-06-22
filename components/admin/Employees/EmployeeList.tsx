"use client";

import { SlideUp } from "@/components/common";
import { RoleEnum } from "@/constants";
import { useGetAllUsers } from "@/hooks/query-hooks/useAdmin";
import { Divider, Group, Select } from "@mantine/core";
import { useState } from "react";
import { Column, MantineTable } from "../common/MantineTable";
import { AssignNurseToDoctor } from "../Doctors/AssignNurseToDoctor";
import { AddEmployeeModal } from "./AddEmployeeModal";
import { DeleteEmployeeModal } from "./DeleteEmployeeModal";
import { UpdateEmployeeModal } from "./UpdateEmployeeModal";

export function EmployeeList() {

    const [employeeType, setEmployeeType] = useState<RoleEnum>(RoleEnum.DOCTOR);

    const handleEmployeeTypeChange = (value: string) => {
        setEmployeeType(value as RoleEnum);
    };

    const getTitle = () => {
        switch (employeeType) {
            case RoleEnum.DOCTOR:
                return "Doctors List";
            case RoleEnum.NURSE:
                return "Nurses List";
            case RoleEnum.STAFF:
                return "Staffs List";
            default:
                return "Employees List";
        }
    };

    const { data } = useGetAllUsers();

    const doctors = data?.filter(user => user.role === RoleEnum.DOCTOR);
    const nurses = data?.filter(user => user.role === RoleEnum.NURSE);
    const staffs = data?.filter(user => user.role === RoleEnum.STAFF);

    const getFilteredData = () => {
        switch (employeeType) {
            case RoleEnum.DOCTOR:
                return doctors;
            case RoleEnum.NURSE:
                return nurses;
            case RoleEnum.STAFF:
                return staffs;
            default:
                return data;
        }
    }

    const columns: Column<User>[] = [
        {
            header: "Name",
            accessor: "name",
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
                <span className={row.active ? "text-green-500" : "text-red-500"}>
                    {row.active ? "Active" : "Inactive"}
                </span>
            ),
            textAlign: "center"
        },
        {
            header: "Department",
            accessor: (row) => row?.department || "N/A",
        },
        {
            header: "Specialization",
            accessor: (row) => row?.specialization || row?.department || "N/A"
        },
        {
            header: "Actions",
            accessor: (user) => (
                <Group justify="center">
                    <UpdateEmployeeModal
                        employee={user}
                    />
                    <DeleteEmployeeModal
                        employee={user}
                    />
                </Group>
            ),
            textAlign: "center"
        }
    ]

    return (
        <section>
            <SlideUp
                className="flex items-center justify-between gap-4"
            >
                <h3 className="text-2xl font-semibold">{getTitle()}</h3>

                <Group>
                    <Select
                        value={employeeType}
                        onChange={(value) => handleEmployeeTypeChange(value!)}
                        data={[
                            { value: RoleEnum.DOCTOR, label: "Doctors" },
                            { value: RoleEnum.NURSE, label: "Nurses" },
                            { value: RoleEnum.STAFF, label: "Staffs" },
                        ]}
                        allowDeselect={false}
                        size="md"
                        width={100}
                    />
                    <AddEmployeeModal
                        employeeType={employeeType}
                    />
                </Group>
            </SlideUp>

            <Divider
                size={"xs"}
                my={20}
            />

            <SlideUp
                className="space-y-4"
            >
                {
                    employeeType === RoleEnum.DOCTOR && (
                        <AssignNurseToDoctor />
                    )
                }
                <MantineTable
                    data={getFilteredData() ?? []}
                    columns={columns}
                    rowKey={(row) => row.id}
                />
            </SlideUp>
        </section>
    )
}
