"use client"

import { useResponsive } from "@/hooks";
import { Text, Title } from "@mantine/core";
import { MedicalRecord } from "./MedicalRecord";

const data: MedicalRecord[] = [
    {
        id: 1,
        title: "Annual Checkup",
        doctor: {
            id: 1,
            name: "Dr. Smith",
            specialty: { id: 1, name: "Cardiology" },
            rating: 4.5,
            availableSlots: ["2023-10-01T10:00", "2023-10-01T11:00"],
            experience: 10,
            availability: "Monday to Friday"
        },
        diagnosis: "Hypertension",
        prescription: "Lisinopril 10mg",
        date: "2023-09-30",
        note: "Follow up in 2 weeks",
        status: "Active"
    },
    {
        id: 2,
        title: "Skin Condition Follow-up",
        doctor: {
            id: 2,
            name: "Dr. Johnson",
            specialty: { id: 2, name: "Dermatology" },
            rating: 4.0,
            availableSlots: ["2023-10-02T09:00", "2023-10-02T10:00"],
            experience: 8,
            availability: "Monday to Saturday"
        },
        diagnosis: "Eczema",
        prescription: "Hydrocortisone cream",
        date: "2023-09-29",
        note: "Apply twice daily",
        status: "Archived"
    },
    {
        id: 3,
        title: "Pediatric Checkup",
        doctor: {
            id: 3,
            name: "Dr. Lee",
            specialty: { id: 3, name: "Pediatrics" },
            rating: 4.8,
            availableSlots: ["2023-10-03T08:00", "2023-10-03T09:00"],
            experience: 12,
            availability: "Monday to Friday"
        },
        diagnosis: "Asthma",
        prescription: "Albuterol inhaler",
        date: "2023-09-28",
        note: "Use as needed",
        status: "Active"
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
                className="space-y-4"
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
