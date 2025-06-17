"use client"

import { useResponsive } from "@/hooks";
import { Text, Title } from "@mantine/core";
import { MedicalRecord } from "./MedicalRecord";

const data: MedicalRecord[] = [
    {
        id: 1,
        doctorName: "Dr. Smith",
        diagnosis: "Hypertension",
        createdDate: "2023-09-30",
        patientName: "John Doe",
    },
    {
        id: 2,
        doctorName: "Dr. Johnson",
        diagnosis: "Eczema",
        createdDate: "2023-09-29",
        patientName: "Jane Doe",
    },
    {
        id: 3,
        doctorName: "Dr. Brown",
        diagnosis: "Diabetes",
        createdDate: "2023-09-28",
        patientName: "Alice Smith",
    }
]

export function MedicalRecordList() {

    const { isMobile } = useResponsive();

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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {data.map((record) => (
                    <MedicalRecord
                        key={record.id}
                        record={record}
                    />
                ))}
            </div>
        </div>
    )
}
