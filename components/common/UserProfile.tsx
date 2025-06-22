"use client";

import { useGetCurrentUser } from "@/hooks/query-hooks/useAdmin";
import { getUserData } from "@/services/getUserData";
import { useUserStore } from "@/states/zustand/user";
import { Stack, Text } from "@mantine/core";
import { useEffect } from "react";

export function UserProfile() {

    const { data } = useGetCurrentUser();

    useEffect(() => {
        if (data) {
            useUserStore.getState().setUser(data);
            getUserData().setUser(data);
        }
    }, [data])


    return (
        <Stack>
            <DataItem
                label="Name"
                value={data?.name}
            />
            <DataItem
                label="Email"
                value={data?.email}
            />
            <DataItem
                label="Phone"
                value={data?.phone}
            />
            <DataItem
                label="Address"
                value={data?.address}
            />
        </Stack>
    )
}

const DataItem = ({
    label,
    value
}: {
    label: string;
    value: string | number | undefined;
}) => {
    return (
        <div className="grid grid-cols-3 rounded-sm border border-black">
            <Text
                p={8}
                bg={"gray.8"}
                c="white"
            >
                {label}:
            </Text>
            <Text
                className="col-span-2"
                fw={"semibold"}
                p={8}
                bg={"gray.1"}
                c="black"
            >
                {value}
            </Text>
        </div>
    );
}