interface Doctor {
    id: number;
    name: string;
    specialty: Specialty;
    rating: number;
    availableSlots: string[];
    experience: number,
    rating: number,
    availability: string,
}

interface Appointment {
    id: string;
    doctorId: string;
    patientName: string;
    date: string;
    time: string;
}

interface Specialty {
    id: number;
    name: string;
    description?: string;
}