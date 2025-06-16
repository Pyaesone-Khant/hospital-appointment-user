import dayjs from "dayjs"
import { Column, MantineTable } from "../admin/common/MantineTable"
import { SlideUp } from "../common"

const data: Payment[] = [
    {
        "id": 1,
        "patientName": "Pyae Pyae",
        "amount": 150,
        "method": "Credit Card",
        "paymentDate": "2025-06-13"
    },
    {
        "id": 2,
        "patientName": "Genos",
        "amount": 150,
        "method": "Credit Card",
        "paymentDate": "2025-06-13"
    }
]


export function PaymentList() {

    const columns: Column<Payment>[] = [
        {
            header: "Patient Name",
            accessor: "patientName",
        },
        {
            header: "Amount",
            accessor: (payment) => `$ ${payment.amount.toFixed(2)}`,
            textAlign: 'right'
        },
        {
            header: "Method",
            accessor: "method",
        },
        {
            header: "Payment Date",
            accessor: (payment) => dayjs(payment.paymentDate).format("DD MMM, YYYY"),
            textAlign: 'center'
        }
    ]

    return (
        <SlideUp>
            <MantineTable
                columns={columns}
                data={data}
                rowKey={(payment) => payment.id.toString()}
            />
        </SlideUp>
    )
}
