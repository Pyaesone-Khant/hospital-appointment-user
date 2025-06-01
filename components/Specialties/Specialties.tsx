import { Badge } from "@mantine/core";

const specialties = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "Psychiatry",
    "General Medicine",
    "Surgery",
]

export function Specialties() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h3 className="text-2xl font-bold text-center mb-8">Our Specialties</h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {specialties.map((specialty) => (
                        <Badge
                            key={specialty}
                            variant="dot"
                            size="lg"
                            bg={"gray.2"}
                        >
                            {specialty}
                        </Badge>
                    ))}
                </div>
            </div>
        </section >
    )
}
