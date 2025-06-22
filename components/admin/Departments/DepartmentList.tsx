"use client";

import { SlideUp } from "@/components/common";
import { useGetAllDepartments } from "@/hooks/query-hooks/useAdmin";
import { Divider } from "@mantine/core";
import { Column, MantineTable } from "../common/MantineTable";
import { AddNewDepartment } from "./AddNewDepartment";

export function DepartmentList() {

    const { data } = useGetAllDepartments();

    const columns: Column<Department>[] = [
        {
            accessor: "id",
            header: "ID",
        },
        {
            accessor: "name",
            header: "Department Name",
        },
        // {
        //     accessor: (row) => (
        //         <>
        //             <Button
        //                 variant="outline"
        //                 color="red"
        //                 size="xs"
        //             >
        //                 Delete
        //             </Button>
        //         </>
        //     ),
        //     header: "Actions",
        //     textAlign: "center"
        // }
    ]

    return (
        <SlideUp>
            <article
                className="flex items-center justify-between"
            >
                <h3 className="text-2xl font-semibold">
                    Departments List
                </h3>

                <AddNewDepartment />
            </article>
            <Divider
                my={20}
            />
            <MantineTable
                columns={columns}
                data={data || []}
                rowKey={(row) => row.id}
            />
        </SlideUp>
    )
}
