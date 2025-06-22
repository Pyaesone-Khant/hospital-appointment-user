import { SlideUp, StatusBadge } from "@/components/common";
import { RoleEnum } from "@/constants";
import { useGetEmployees } from "@/hooks/query-hooks/useAdmin";
import { Column, MantineTable } from "../common/MantineTable";

export function StaffList() {

    const { data } = useGetEmployees(RoleEnum.STAFF);
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
                data={data as Staff[]}
                columns={columns}
                rowKey={(row) => row.staffId}
            />
        </SlideUp>
    )
}
