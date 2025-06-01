import { DoctorCard } from "./DoctorCard";

const doctors: Doctor[] = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: { id: 1, name: "Cardiology" },
        experience: 15,
        rating: 4.9,
        availability: "Mon-Fri",
        availableSlots: ["9:00 AM - 10:00 AM", "10:30 AM - 11:30 AM", "1:00 PM - 2:00 PM"],
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: { id: 2, name: "Neurology" },
        experience: 12,
        rating: 4.8,
        availability: "Tue-Sat",
        availableSlots: ["8:00 AM - 9:00 AM", "11:00 AM - 12:00 AM", "3:00 PM - 4:00 PM"],
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: { id: 3, name: "Pediatrics" },
        experience: 10,
        rating: 4.9,
        availability: "Mon-Wed-Fri",
        availableSlots: ["9:30 AM - 10:30 AM", "1:30 AM -2:30 AM", "3:00 PM - 4:00 PM"],
    },
    {
        id: 4,
        name: "Dr. James Wilson",
        specialty: { id: 4, name: "Orthopedics" },
        experience: 18,
        rating: 4.7,
        availability: "Mon-Thu",
        availableSlots: ["9:00 AM - 10:00 AM", "1:00 AM - 2:00 AM", "4:00 PM - 5:00 PM"],
    },
    {
        id: 5,
        name: "Dr. Lisa Thompson",
        specialty: { id: 5, name: "Dermatology" },
        experience: 8,
        rating: 4.8,
        availability: "Tue-Fri",
        availableSlots: ["8:00 AM - 9:00 AM", "10:30 AM - 11:30 AM", "2:00 PM - 3:00 PM"],
    },
    {
        id: 6,
        name: "Dr. Robert Davis",
        specialty: { id: 6, name: "Psychiatry" },
        experience: 20,
        rating: 4.9,
        availability: "Mon-Fri",
        availableSlots: ["9:00 AM - 10:00 AM", "11:00 AM - 12:00 AM", "1:00 PM - 2:00 PM"],
    },
]

export function Doctors() {

    return (
        <section className="py-12 bg-gray-50" >
            <div className="container mx-auto px-4">
                <h3 className="text-2xl font-bold text-center mb-8">Our Doctors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        doctors.map((doctor) => (
                            <DoctorCard
                                doctor={doctor}
                                key={doctor.id}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
