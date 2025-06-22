"use client";

import { RoleEnum } from "@/constants";
import { useGetEmployees } from "@/hooks/query-hooks/useAdmin";
import { DoctorCard } from "./DoctorCard";

export function Doctors() {


    const { data: doctors } = useGetEmployees(RoleEnum.DOCTOR);

    return (
        <section className="py-12 bg-gray-50" >
            <div className="container mx-auto px-4">
                <h3 className="text-2xl font-bold text-center mb-8">Our Doctors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        doctors?.map((doctor) => (
                            <DoctorCard
                                doctor={doctor as Doctor}
                                key={JSON.stringify(doctor)}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
