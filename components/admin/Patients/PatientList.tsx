"use client";

import { AnimatedComponent, SlideUp, StatusBadge } from "@/components/common";
import { ActionIcon } from "@mantine/core";
import { Eye } from "lucide-react";
import { Column, MantineTable } from "../common/MantineTable";

const data: User[] = [
    {
        "id": 3,
        "name": "Pyae Pyae",
        "email": "ayewinwin510@gmail.com",
        "phone": "84161945",
        "address": "Singapore",
        "role": "USER",
        "active": true
    },
    {
        "id": 6,
        "name": "aye aye",
        "email": "ayewinwin9901@gmail.com",
        "phone": "84161945",
        "address": "Singapore",
        "role": "USER",
        "active": true
    }
]

export function PatientList() {

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
            header: "Address",
            accessor: "address",
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
        {
            header: "Actions",
            accessor: (user: User) => (
                <ActionIcon
                    variant="subtle"
                    color="blue"
                    onClick={() => alert(`Edit patient ${user.name}`)}
                    size="lg"
                >
                    <Eye
                        size={18}
                    />
                </ActionIcon>
            ),
            textAlign: "center"
        }
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
                    data={data}
                    rowKey={(row) => row.id}
                />
            </SlideUp>
        </AnimatedComponent>
    )
}
