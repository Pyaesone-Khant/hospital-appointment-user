"use client";

import { AppointmentList } from "@/components/admin/Appointments";
import { DoctorShiftList } from "@/components/admin/Doctors";
import { JWTRoleEnum } from "@/constants";
import { useUserStore } from "@/states/zustand/user";

export default function Page() {

    const jwt = useUserStore((state) => state.jwt);

    const isAdmin = jwt?.role === JWTRoleEnum.ADMIN;
    const isStaff = jwt?.role === JWTRoleEnum.STAFF;

    return (
        <>
            {
                isAdmin && (
                    <DoctorShiftList />
                )
            }
            {
                isStaff && (
                    <AppointmentList />
                )
            }
        </>
    )
}
