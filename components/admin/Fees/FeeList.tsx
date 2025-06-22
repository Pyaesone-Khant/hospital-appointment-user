"use client";

import { SlideUp } from "@/components/common";
import { useGetAllFees } from "@/hooks/query-hooks/useStaff";
import { Group } from "@mantine/core";
import { Column, MantineTable } from "../common/MantineTable";
import { AddFee } from "./AddFee";
import { DeleteFee } from "./DeleteFee";
import { EditFee } from "./EditFee";

export function FeeList() {

    const { data } = useGetAllFees();

    const columns: Column<Fee>[] = [
        {
            header: "ID",
            accessor: "id",
        },
        {
            header: "Name",
            accessor: "name"
        },
        {
            header: "Amount",
            accessor: "amount"
        },
        {
            header: "Description",
            accessor: "description"
        },
        {
            header: "Actions",
            accessor: (fee) => (
                <Group>
                    <EditFee
                        {...fee}
                    />
                    <DeleteFee
                        feeId={fee.id}
                    />
                </Group>
            )
        }
    ]

    return (
        <SlideUp
            className="space-y-6"
        >
            <article
                className="flex flex-row justify-between items-center"
            >
                <h3
                    className="text-2xl font-semibold"
                >
                    Fees
                </h3>
                <AddFee />
            </article>

            <MantineTable
                data={data ?? []}
                columns={columns}
                rowKey={(fee) => JSON.stringify(fee)}
            />
        </SlideUp>
    )
}
