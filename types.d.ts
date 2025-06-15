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

interface MedicalRecord {
    id: number;
    title: string;
    doctor: Doctor;
    diagnosis: string;
    prescription: string;
    date: string;
    note?: string;
    status: "Active" | "Archived";
}

enum RoleEnum {
    STAFF = "ROLE_STAFF",
    DOCTOR = "ROLE_DOCTOR",
    PATIENT = "ROLE_PATIENT",
    ADMIN = "ROLE_ADMIN",
    NURSE = "ROLE_NURSE",
}

interface JWT {
    accessToken: string;
    type: string;
    expiredAt: string;
    role: RoleEnum;
}