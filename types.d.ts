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
    id: number;
    doctor: Doctor;
    date: string;
    time: string;
    status: "Pending" | "Confirmed" | "Cancelled";
}

interface Specialty {
    id: number;
    name: string;
    description?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: "patient" | "doctor" | "admin" | "nurse";
}