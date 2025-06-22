"use client";

import { SlideUp, StatusBadge } from "@/components/common";
import { useGetAllDoctorShifts } from "@/hooks/query-hooks/useAdmin";
import { Divider } from "@mantine/core";
import { Column, MantineTable } from "../common/MantineTable";
import { AssignDoctorShiftModal } from "./AssignDoctorShiftModal";

export function DoctorShiftList() {

    const { data } = useGetAllDoctorShifts();

    const columns: Column<DoctorShift>[] = [
        {
            header: "Doctor Name",
            accessor: "doctorName",
        },
        {
            header: "Date",
            accessor: "date",
        },
        {
            header: "Start Time",
            accessor: "startTime",
        },
        {
            header: "End Time",
            accessor: "endTime",
        },
        {
            header: "Status",
            accessor: (row) => (
                <StatusBadge
                    color={row.available ? "green" : "red"}
                >
                    {row.available ? "Available" : "Not Available"}
                </StatusBadge>
            )
        }
    ]

    return (
        <SlideUp>
            <article
                className="flex items-center justify-between gap-4"
            >
                <h3
                    className="text-2xl font-semibold"
                >
                    Doctor Shifts
                </h3>

                <AssignDoctorShiftModal />
            </article>
            <Divider
                my={20}
            />
            <MantineTable
                data={data || []}
                columns={columns}
                rowKey={(row) => JSON.stringify(row)}
            />
        </SlideUp>
    )
}
