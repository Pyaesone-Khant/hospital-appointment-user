"use client";

import { useGetAllPayments } from "@/hooks/query-hooks/useStaff";
import dayjs from "dayjs";
import { Column, MantineTable } from "../admin/common/MantineTable";
import { SlideUp } from "../common";

export function PaymentList() {

    const { data } = useGetAllPayments();

    const columns: Column<Payment>[] = [
        {
            header: "Patient Name",
            accessor: "patientName",
        },
        {
            header: "Amount",
            accessor: (payment) => `$ ${payment?.amount.toFixed(2)}`,
            textAlign: 'right'
        },
        {
            header: "Method",
            accessor: (payment) => payment?.method ?? "N/A",
        },
        {
            header: "Payment Date",
            accessor: (payment) => payment?.paymentDate !== "N/A" ? dayjs(payment.paymentDate).format("DD MMM, YYYY") : "Pending",
            textAlign: 'center'
        }
    ]

    return (
        <SlideUp
            className="space-y-6"
        >
            <article>
                <h3
                    className="text-2xl font-semibold"
                >
                    Payments
                </h3>
            </article>
            <MantineTable
                columns={columns}
                data={data ?? []}
                rowKey={(payment) => payment.id.toString()}
            />
        </SlideUp>
    )
}
