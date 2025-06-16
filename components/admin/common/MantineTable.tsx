import { Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from "@mantine/core";

export type Column<T> = {
    header: string;
    accessor: keyof T | string | ((row: T) => React.ReactNode);
    textAlign?: "left" | "center" | "right";
}

type MantineTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    rowKey: (row: T) => string | number
} & React.ComponentProps<typeof Table>;

export function MantineTable<T>({
    columns,
    data,
    rowKey,
    ...props
}: MantineTableProps<T>) {

    const renderCell = (row: T, column: Column<T>) => {
        if (typeof column.accessor === "function") {
            return column.accessor(row);
        }

        if (typeof column.accessor === "string") {
            const value = getValueByPath(row, column.accessor);
            return value !== undefined ? value : null;
        }

        return row[column.accessor as keyof T] as React.ReactNode;
    }


    return (
        <div
            className="w-full overflow-x-auto"
        >
            <Table
                {...props}
                classNames={{
                    th: "!min-w-[120px]"
                }}
                withColumnBorders
                withTableBorder
                withRowBorders
                highlightOnHover
            >
                <TableThead
                    classNames={{
                        thead: "!bg-[var(--mantine-color-blue-0)]",
                    }}
                >
                    <TableTr
                        className="!h-12"
                    >
                        {columns.map((column, index) => (
                            <TableTh
                                key={index}
                                style={{ textAlign: column.textAlign || "left" }}
                                className="!font-semibold !text-[var(--mantine-color-blue-8)]"
                            >
                                {column.header}
                            </TableTh>
                        ))}
                    </TableTr>
                </TableThead>
                <TableTbody
                    classNames={{
                        tbody: " overflow-y-auto overflow-x-auto ",
                    }}
                >
                    {data?.length > 0 ? (
                        data.map((row) => (
                            <TableTr key={rowKey(row)}>
                                {columns.map((column, index) => (
                                    <TableTd
                                        key={index}
                                        style={{ textAlign: column.textAlign || "left" }}
                                    >
                                        {renderCell(row, column)}
                                    </TableTd>
                                ))}
                            </TableTr>
                        ))) : (
                        <TableTr>
                            <TableTd colSpan={columns.length} style={{ textAlign: "center" }}>
                                No data available
                            </TableTd>
                        </TableTr>
                    )}
                </TableTbody>
            </Table >
        </div>
    )
}

function getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}