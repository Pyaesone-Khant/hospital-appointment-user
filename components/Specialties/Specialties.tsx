"use client";
import { useGetAllDepartments } from "@/hooks/query-hooks/useAdmin";
import { Badge } from "@mantine/core";

export function Specialties() {

    const { data } = useGetAllDepartments();

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h3 className="text-2xl font-bold text-center mb-8">Our Specialties</h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {data?.map((specialty) => (
                        <Badge
                            key={JSON.stringify(specialty)}
                            variant="dot"
                            size="lg"
                            bg={"gray.2"}
                        >
                            {specialty.name}
                        </Badge>
                    ))}
                </div>
            </div>
        </section >
    )
}
