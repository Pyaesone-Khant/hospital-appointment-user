import { Text, Title } from "@mantine/core"
import { Appointment } from "./Appointment"

const data: Appointment[] = [
    {
        id: 1,
        date: '2023-10-01',
        time: '10:00 AM',
        doctor: {
            id: 1,
            name: 'Dr. Smith',
            specialty: {
                id: 1,
                name: 'Cardiology',
                description: 'Heart and blood vessel specialist'
            },
            availableSlots: ['10:00 AM', '11:00 AM'],
            experience: 10,
            rating: 4.5,
            availability: 'Monday to Friday'
        },
        status: 'Confirmed'
    },
    {
        id: 2,
        date: '2023-10-02',
        time: '11:00 AM',
        doctor: {
            id: 2,
            name: 'Dr. Johnson',
            specialty: {
                id: 2,
                name: 'Dermatology',
                description: 'Skin specialist'
            },
            availableSlots: ['11:00 AM', '12:00 PM'],
            experience: 8,
            rating: 4.0,
            availability: 'Monday to Saturday'
        },
        status: 'Pending'
    }
]

export function AppointmentList() {
    return (
        <section
            className="p-6 border border-black/10 shadow rounded-md space-y-6"
        >
            <article>
                <Title
                    order={2}
                >
                    Upcoming Appointments
                </Title>
                <Text
                    c={"gray.7"}
                >
                    Your upcoming appointments are listed below. You can view details, reschedule, or cancel them as needed.
                </Text>
            </article>

            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {
                    data?.map((appointment) => (
                        <Appointment
                            key={appointment.id ?? JSON.stringify(appointment)}
                            appointment={appointment}
                        />
                    ))
                }
            </div>
        </section>
    )
}
