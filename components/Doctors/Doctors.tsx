import { DoctorCard } from "./DoctorCard";

const doctors: Doctor[] = [
    {
        "doctorId": 1,
        "fullName": "Thiri",
        "email": "Singapore",
        "address": "thiriyaminsu145@gmail.com",
        "phone": "84161945",
        "specialization": "Cardiology",
        "department": "Cardiology",
        "assignedNurse": "No nurse assigned",
        "active": false
    },
    {
        "doctorId": 2,
        "fullName": "Win Aye",
        "email": "Singapore",
        "address": "wwaye005@gmail.com",
        "phone": "84161945",
        "specialization": "Cardiology",
        "department": "Cardiology",
        "assignedNurse": "No nurse assigned",
        "active": true
    }
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
                                key={doctor.doctorId}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
