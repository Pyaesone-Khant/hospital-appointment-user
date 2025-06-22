"use client";

import { AnimatedComponent, SlideUp, StatusBadge } from "@/components/common";
import { useGetAllPatients } from "@/hooks/query-hooks/useAdmin";
import { Column, MantineTable } from "../common/MantineTable";

export function PatientList() {

    const { data } = useGetAllPatients();

    const columns: Column<User>[] = [
        {
            header: "ID",
            accessor: "id",
            textAlign: "center"
        },
        {
            header: "Name",
            accessor: "name",
            textAlign: "left"
        },
        {
            header: "Email",
            accessor: "email",
            textAlign: "left"
        },
        {
            header: "Phone",
            accessor: "phone",
            textAlign: "left"
        },
        {
            header: "Status",
            accessor: (row) => (
                <StatusBadge
                    color={row.active ? "green" : "red"}
                >
                    {row.active ? "Active" : "Inactive"}
                </StatusBadge>
            ),
            textAlign: "center"
        },
    ]

    return (
        <AnimatedComponent
            className="space-y-4"
        >
            <SlideUp>
                <h1 className="text-2xl font-semibold">Patient List</h1>
                <p className="text-gray-600">
                    Manage your patients efficiently with our user-friendly interface.
                </p>
            </SlideUp>
            <SlideUp>
                <MantineTable
                    columns={columns}
                    data={data ?? []}
                    rowKey={(row) => row.id}
                />
            </SlideUp>
        </AnimatedComponent>
    )
}
