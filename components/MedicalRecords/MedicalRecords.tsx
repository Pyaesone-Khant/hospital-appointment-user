"use client"

import { JWTRoleEnum } from "@/constants";
import { useResponsive } from "@/hooks";
import { useGetMedicalRecords } from "@/hooks/query-hooks/useMedicalRecord";
import { useUserStore } from "@/states/zustand/user";
import { Text, Title } from "@mantine/core";
import { MedicalRecord } from "./MedicalRecord";

export function MedicalRecords() {

    const { isMobile } = useResponsive();

    const jwt = useUserStore(state => state.jwt)

    const role = jwt?.role || JWTRoleEnum.USER;

    const { data } = useGetMedicalRecords(role)

    return (
        <div
            className="p-6 border border-black/10 shadow rounded-md space-y-6"
        >
            <article>
                <Title
                    order={isMobile ? 3 : 2}
                    fw={600}
                >
                    Medical Records
                </Title>
                <Text
                    c={"gray.7"}
                    fz={isMobile ? "sm" : "md"}
                >
                    Your complete medical record history. This includes diagnoses, prescriptions, and doctor details.
                </Text>
            </article>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {data?.map((record) => (
                    <MedicalRecord
                        key={record.id}
                        record={record}
                    />
                ))}
            </div>

            {data?.length === 0 && (
                <Text
                    c={"gray.6"}
                    fz={isMobile ? "sm" : "md"}
                    className="text-center"
                >
                    No medical records found.
                </Text>
            )}
        </div>
    )
}
