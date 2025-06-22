
"use client";

import { JWTRoleEnum } from "@/constants";
import { useResponsive } from "@/hooks";
import { useGetShitSchedule } from "@/hooks/query-hooks/useDoctor";
import { useUserStore } from "@/states/zustand/user";
import { Text, Title } from "@mantine/core";
import { DoctorShiftCard } from "./DoctorShiftCard";
import { NurseShiftCard } from "./NurseShiftCard";

export function Shifts() {

    const { isMobile } = useResponsive();

    const jwt = useUserStore((state) => state.jwt);
    const { data } = useGetShitSchedule(jwt?.role ?? JWTRoleEnum.DOCTOR)

    return (
        <section
            className="p-6 border border-black/10 shadow rounded-md space-y-6"
        >
            <article>
                <Title
                    order={isMobile ? 3 : 2}
                    fw={600}
                >
                    Shifts Schedule
                </Title>
                <Text
                    c={"gray.7"}
                    fz={isMobile ? "sm" : "md"}
                >
                    Assigned shifts for doctors and nurses are displayed below. You can view the schedule and manage shifts as needed.
                </Text>
            </article>

            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {
                    jwt?.role === JWTRoleEnum.DOCTOR ? data?.map((shift) => (
                        <DoctorShiftCard
                            key={JSON.stringify(shift)}
                            shift={shift as DoctorShift}
                        />
                    )) : data?.map((shift) => (
                        <NurseShiftCard
                            key={JSON.stringify(shift)}
                            shift={shift as NurseShift}
                        />
                    ))
                }
            </div>

            {data?.length === 0 && (
                <Text
                    c={"gray.6"}
                    fz={isMobile ? "sm" : "md"}
                    className="text-center"
                >
                    No upcoming appointments found.
                </Text>
            )}
        </section>
    )
}
